import { createClient } from '../client';
import type { Database } from '@/types/supabase';

export type ProductRow = Database['public']['Tables']['products']['Row'];
export type ProductVariantRow = Database['public']['Tables']['product_variants']['Row'];
export type ProductImageRow = Database['public']['Tables']['product_images']['Row'];

export interface ProductWithDetails extends ProductRow {
  product_images: ProductImageRow[];
  product_variants: ProductVariantRow[];
}

export class SupabaseQueryError extends Error {
  public readonly originalError: unknown;

  constructor(message: string, originalError?: unknown) {
    super(message);
    this.name = 'SupabaseQueryError';
    this.originalError = originalError;
  }
}

export async function getPublishedProducts(): Promise<ProductRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new SupabaseQueryError(`Failed to fetch published products: ${error.message}`, error);
    }

    return data ?? [];
  } catch (err) {
    if (err instanceof SupabaseQueryError) throw err;
    throw new SupabaseQueryError('Unexpected error while fetching published products', err);
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      throw new SupabaseQueryError(`Failed to fetch product by slug "${slug}": ${error.message}`, error);
    }

    return (data as ProductWithDetails | null);
  } catch (err) {
    if (err instanceof SupabaseQueryError) throw err;
    throw new SupabaseQueryError(`Unexpected error while fetching product by slug "${slug}"`, err);
  }
}

export async function getProductVariants(productId: string): Promise<ProductVariantRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .order('sku', { ascending: true });

    if (error) {
      throw new SupabaseQueryError(`Failed to fetch variants for product ID "${productId}": ${error.message}`, error);
    }

    return data ?? [];
  } catch (err) {
    if (err instanceof SupabaseQueryError) throw err;
    throw new SupabaseQueryError(`Unexpected error while fetching variants for product ID "${productId}"`, err);
  }
}
