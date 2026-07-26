import { createClient } from '../client';
import type { Database } from '@/types/supabase';

export type ProductRow = Database['public']['Tables']['products']['Row'];
export type ProductImageRow = Database['public']['Tables']['product_images']['Row'];
export type ProductVariantRow = Database['public']['Tables']['product_variants']['Row'];

export interface ProductWithDetails extends ProductRow {
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
}

export async function getPublishedProducts(): Promise<ProductWithDetails[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('⚠️ getPublishedProducts query warning:', error.message);
      return [];
    }

    return (data as ProductWithDetails[]) || [];
  } catch (err) {
    console.warn('⚠️ Unexpected error in getPublishedProducts:', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.warn(`⚠️ getProductBySlug query warning for ${slug}:`, error.message);
      return null;
    }

    return (data as ProductWithDetails) || null;
  } catch (err) {
    console.warn(`⚠️ Unexpected error in getProductBySlug for ${slug}:`, err);
    return null;
  }
}
