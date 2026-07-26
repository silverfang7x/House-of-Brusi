/**
 * Instagram Apify Sync API Handler
 *
 * Route: POST /api/sync/instagram
 * Security: Protected by process.env.SYNC_SECRET (passed via x-sync-secret header or Bearer token)
 *
 * Scheduling via Vercel Cron:
 * Configure `vercel.json` at repo root:
 * {
 *   "crons": [
 *     {
 *       "path": "/api/sync/instagram",
 *       "schedule": "0 0 * * *"
 *     }
 *   ]
 * }
 * Vercel automatically passes `Authorization: Bearer <CRON_SECRET>` or custom headers.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface ApifyDatasetItem {
  id?: string;
  shortCode?: string;
  url?: string;
  displayUrl?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  postUrl?: string;
  timestamp?: string;
  takenAt?: string;
}

export async function POST(request: Request) {
  try {
    // 1. Authorization check
    const syncSecret = process.env.SYNC_SECRET;
    const providedSecret =
      request.headers.get('x-sync-secret') ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (syncSecret && providedSecret !== syncSecret) {
      console.warn('🔒 Unauthorized Instagram sync request attempt blocked.');
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing sync secret header' },
        { status: 401 }
      );
    }

    // 2. Validate Apify token and Supabase service role credentials
    const apifyToken = process.env.APIFY_API_TOKEN;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!apifyToken || apifyToken.includes('placeholder')) {
      console.warn('⚠️ Apify API token missing or placeholder. Skipping live fetch.');
      return NextResponse.json(
        {
          success: false,
          message: 'APIFY_API_TOKEN is unconfigured or placeholder.',
        },
        { status: 200 }
      );
    }

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
      console.warn('⚠️ Supabase service role credentials missing or placeholder.');
      return NextResponse.json(
        {
          success: false,
          message: 'Supabase credentials missing or placeholder.',
        },
        { status: 200 }
      );
    }

    // 3. Call Apify Instagram Scraper API
    console.log('📡 Fetching latest @house_of_brusi Instagram posts from Apify...');

    const apifyEndpoint = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${apifyToken}`;

    const apifyResponse = await fetch(apifyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        directUrls: ['https://www.instagram.com/house_of_brusi/'],
        resultsType: 'posts',
        resultsLimit: 24,
      }),
    });

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text();
      throw new Error(`Apify API request failed [Status ${apifyResponse.status}]: ${errorText}`);
    }

    const datasetItems: unknown = await apifyResponse.json();

    if (!Array.isArray(datasetItems)) {
      throw new Error('Apify API returned unexpected data format (expected an array)');
    }

    console.log(`✅ Received ${datasetItems.length} posts from Apify. Formatting for database...`);

    // 4. Map dataset items to instagram_posts schema
    const items = datasetItems as ApifyDatasetItem[];
    const postsToUpsert = items
      .filter((item) => item.displayUrl || item.imageUrl || item.url)
      .map((item) => ({
        instagram_post_id: String(item.id || item.shortCode || item.url),
        media_url: item.displayUrl || item.imageUrl || item.thumbnailUrl || item.url || '',
        caption: item.caption || '',
        permalink: item.url || item.postUrl || `https://www.instagram.com/p/${item.shortCode || ''}/`,
        posted_at: item.timestamp || item.takenAt || new Date().toISOString(),
        synced_at: new Date().toISOString(),
      }));

    // 5. Upsert into Supabase using service-role client (onConflict: instagram_post_id)
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error: upsertError } = await supabase
      .from('instagram_posts')
      .upsert(postsToUpsert, { onConflict: 'instagram_post_id' });

    if (upsertError) {
      throw new Error(`Supabase upsert failed: ${upsertError.message}`);
    }

    console.log(`🎉 Successfully upserted ${postsToUpsert.length} Instagram posts.`);

    return NextResponse.json({
      success: true,
      upsertedCount: postsToUpsert.length,
      syncedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error during sync pipeline';
    console.error('❌ Instagram Sync Error:', errorMessage);
    // Return 500 without modifying/deleting existing database rows
    return NextResponse.json(
      {
        error: 'Instagram sync failed',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
