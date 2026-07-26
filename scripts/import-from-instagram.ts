import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isPlaceholder =
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes('your-project') ||
  supabaseKey.includes('placeholder');

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

interface DraftProduct {
  slug: string;
  name: string;
  collectionSlug: string;
  description: string;
  suggestedTags: string[];
  careInstructions: string;
  fabric: string;
  basePriceRupees: number;
  compareAtPriceRupees: number | null;
  NEEDS_PRICING: boolean;
  FILL_ME_IN: string;
  images: Array<{ url: string; altText: string }>;
  variants: Array<{
    size: string;
    colorName: string;
    colorHex: string;
    sku: string;
    inventoryCount: number;
  }>;
  instagramPostId: string;
}

async function generateDraftsFromInstagram() {
  console.log('📸 Starting Instagram Product Draft Generator...\n');

  const draftFilePath = path.resolve(process.cwd(), 'content/products.draft.json');
  let existingDrafts: DraftProduct[] = [];

  if (fs.existsSync(draftFilePath)) {
    try {
      const raw = fs.readFileSync(draftFilePath, 'utf-8');
      existingDrafts = JSON.parse(raw);
    } catch {
      existingDrafts = [];
    }
  }

  let posts: Array<{ instagram_post_id: string; media_url: string; caption?: string }> = [];

  if (isPlaceholder) {
    console.log(
      'ℹ️ Note: Supabase credentials are placeholder. Simulating Instagram post draft generation...\n'
    );
    // Mock unlinked posts for validation demonstration
    posts = [
      {
        instagram_post_id: 'ig_post_demo_101',
        media_url:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        caption: 'Handcrafted Sandstorm Linen Duster Coat\nTailored for the desert horizon. #HouseOfBrusi #LinenDuster #Bespoke',
      },
    ];
  } else {
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .is('linked_product_id', null);

    if (error) {
      console.warn(`⚠️ Warning fetching instagram_posts: ${error.message}`);
    }
    posts = data || [];
  }

  const existingPostIds = new Set(existingDrafts.map((d) => d.instagramPostId));
  let newDraftsCount = 0;

  for (const post of posts) {
    if (existingPostIds.has(post.instagram_post_id)) continue;

    const fullCaption = post.caption || 'House of Brusi Artisan Piece';
    const firstLine = fullCaption.split('\n')[0]?.replace(/#\w+/g, '').trim() || 'Artisan Garment';
    const suggestedName = toTitleCase(firstLine.slice(0, 45));
    const suggestedSlug = slugify(suggestedName);

    const hashtags = (fullCaption.match(/#\w+/g) || []).map((tag) => tag.replace('#', ''));
    const cleanedDescription = fullCaption.replace(/#\w+/g, '').trim();

    const draftItem: DraftProduct = {
      slug: suggestedSlug || `ig-draft-${post.instagram_post_id}`,
      name: suggestedName,
      collectionSlug: 'desert-bloom',
      description: cleanedDescription,
      suggestedTags: hashtags,
      careInstructions: 'Dry clean or gentle hand wash cold.',
      fabric: '100% Organic Cotton / Linen',
      basePriceRupees: 0,
      compareAtPriceRupees: null,
      NEEDS_PRICING: true,
      FILL_ME_IN:
        'Fill in basePriceRupees, color, sizes, and SKUs before moving to content/products.json',
      images: [
        {
          url: post.media_url,
          altText: suggestedName,
        },
      ],
      variants: [
        {
          size: 'M',
          colorName: 'Default Color',
          colorHex: '#17140F',
          sku: `HOB-${suggestedSlug.slice(0, 6).toUpperCase()}-M`,
          inventoryCount: 10,
        },
      ],
      instagramPostId: post.instagram_post_id,
    };

    existingDrafts.push(draftItem);
    newDraftsCount++;
  }

  fs.writeFileSync(draftFilePath, JSON.stringify(existingDrafts, null, 2));

  console.log('----------------------------------------');
  console.log(`✅ Instagram Draft Processing Complete!`);
  console.log(`   New Drafts Appended : ${newDraftsCount}`);
  console.log(`   Total Drafts Pending: ${existingDrafts.length}`);
  console.log(`   Draft File Location : content/products.draft.json`);
  console.log('----------------------------------------\n');
}

generateDraftsFromInstagram().catch((err) => {
  console.error('❌ Unhandled error in Instagram draft generator:', err);
  process.exit(1);
});
