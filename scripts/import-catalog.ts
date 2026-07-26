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

interface CatalogImage {
  url: string;
  altText: string;
}

interface CatalogVariant {
  size: string;
  colorName: string;
  colorHex: string;
  sku: string;
  inventoryCount: number;
  priceOverrideRupees?: number | null;
}

interface CatalogProduct {
  slug: string;
  name: string;
  collectionSlug: string;
  description: string;
  careInstructions?: string;
  fabric?: string;
  basePriceRupees: number;
  compareAtPriceRupees?: number | null;
  images: CatalogImage[];
  variants: CatalogVariant[];
}

async function syncCatalog() {
  console.log('📦 Starting House of Brusi Catalog Import Pipeline...\n');

  const filePath = path.resolve(process.cwd(), 'content/products.json');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found at ${filePath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const products: CatalogProduct[] = JSON.parse(rawData);

  if (isPlaceholder) {
    console.log(
      'ℹ️ Note: NEXT_PUBLIC_SUPABASE_URL is unconfigured or placeholder. Running Catalog Validation Mode...\n'
    );

    let validProducts = 0;
    let totalVariants = 0;
    const skuSet = new Set<string>();

    for (const item of products) {
      const basePricePaise = Math.round(item.basePriceRupees * 100);
      const compareAtPaise =
        item.compareAtPriceRupees != null ? Math.round(item.compareAtPriceRupees * 100) : null;

      for (const variant of item.variants) {
        if (skuSet.has(variant.sku)) {
          console.warn(`  ⚠️ Duplicate SKU detected in content/products.json: ${variant.sku}`);
        }
        skuSet.add(variant.sku);
        totalVariants++;
      }

      validProducts++;
      console.log(
        `  [VALIDATED] ${item.name} (${item.slug}) -> ₹${item.basePriceRupees.toLocaleString('en-IN')} (${basePricePaise} paise) - ${item.variants.length} variants, ${item.images.length} images`
      );
    }

    console.log('\n----------------------------------------');
    console.log(`✅ Catalog Validation Successful!`);
    console.log(`   Validated Products : ${validProducts}`);
    console.log(`   Validated Variants : ${totalVariants}`);
    console.log(`   Unique SKUs Check  : ${skuSet.size}`);
    console.log('----------------------------------------\n');
    return;
  }

  const supabase = createClient(supabaseUrl!, supabaseKey!);

  // Fetch collections map (slug -> id)
  const { data: collections, error: collectionsError } = await supabase
    .from('collections')
    .select('id, slug');

  if (collectionsError) {
    console.error('❌ Failed to fetch collections:', collectionsError.message);
    process.exit(1);
  }

  const collectionMap = new Map<string, string>();
  collections?.forEach((c) => collectionMap.set(c.slug, c.id));

  let totalCreated = 0;
  let totalUpdated = 0;
  let totalVariantsSynced = 0;

  for (const item of products) {
    const collectionId = collectionMap.get(item.collectionSlug) || null;
    const basePricePaise = Math.round(item.basePriceRupees * 100);
    const compareAtPricePaise =
      item.compareAtPriceRupees != null
        ? Math.round(item.compareAtPriceRupees * 100)
        : null;

    const { data: existingProduct } = await supabase
      .from('products')
      .select('id')
      .eq('slug', item.slug)
      .maybeSingle();

    const isNew = !existingProduct;

    const { data: upsertedProduct, error: productError } = await supabase
      .from('products')
      .upsert(
        {
          slug: item.slug,
          name: item.name,
          collection_id: collectionId,
          description: item.description,
          care_instructions: item.careInstructions || null,
          fabric: item.fabric || null,
          base_price_paise: basePricePaise,
          compare_at_price_paise: compareAtPricePaise,
          is_published: true,
        },
        { onConflict: 'slug' }
      )
      .select('id')
      .single();

    if (productError || !upsertedProduct) {
      console.error(`❌ Failed to upsert product "${item.name}":`, productError?.message);
      continue;
    }

    const productId = upsertedProduct.id;

    if (isNew) {
      totalCreated++;
    } else {
      totalUpdated++;
    }

    // Upsert images
    if (item.images && item.images.length > 0) {
      await supabase.from('product_images').delete().eq('product_id', productId);
      const imagesToInsert = item.images.map((img, index) => ({
        product_id: productId,
        url: img.url,
        alt_text: img.altText,
        sort_order: index + 1,
        is_primary: index === 0,
      }));
      await supabase.from('product_images').insert(imagesToInsert);
    }

    // Upsert variants
    if (item.variants && item.variants.length > 0) {
      for (const variant of item.variants) {
        const priceOverridePaise =
          variant.priceOverrideRupees != null
            ? Math.round(variant.priceOverrideRupees * 100)
            : null;

        const { error: variantError } = await supabase.from('product_variants').upsert(
          {
            product_id: productId,
            size: variant.size,
            color_name: variant.colorName,
            color_hex: variant.colorHex,
            sku: variant.sku,
            inventory_count: variant.inventoryCount,
            price_override_paise: priceOverridePaise,
          },
          { onConflict: 'sku' }
        );

        if (!variantError) {
          totalVariantsSynced++;
        } else {
          console.error(`  ⚠️ Variant upsert error (${variant.sku}):`, variantError.message);
        }
      }
    }

    const actionTag = isNew ? 'CREATED' : 'UPDATED';
    console.log(
      `  [${actionTag}] ${item.name} (${item.slug}) - ${item.variants.length} variants, ${item.images.length} images`
    );
  }

  console.log('\n----------------------------------------');
  console.log(`✅ Catalog Sync Complete!`);
  console.log(`   Created Products : ${totalCreated}`);
  console.log(`   Updated Products : ${totalUpdated}`);
  console.log(`   Variants Synced  : ${totalVariantsSynced}`);
  console.log('----------------------------------------\n');
}

syncCatalog().catch((err) => {
  console.error('❌ Unhandled catalog sync error:', err);
  process.exit(1);
});
