import { createClient } from '../client';
import type { Database } from '@/types/supabase';

export type InstagramPostRow = Database['public']['Tables']['instagram_posts']['Row'];

export interface InstagramPostWithProduct extends InstagramPostRow {
  linked_product?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export async function getShopTheGramPosts(limit = 6): Promise<InstagramPostWithProduct[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*, linked_product:products(id, name, slug)')
      .not('media_url', 'is', null)
      .order('posted_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('⚠️ getShopTheGramPosts query warning:', error.message);
      return [];
    }

    return (data as InstagramPostWithProduct[]) || [];
  } catch (err) {
    console.warn('⚠️ Unexpected error in getShopTheGramPosts:', err);
    return [];
  }
}
