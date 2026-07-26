-- House of Brusi - Placeholder Seed Data
-- NOTE: This is throwaway seed data purely for development rendering.
-- It will be replaced with real House of Brusi catalog data before launch.

-- 1. COLLECTIONS
insert into public.collections (id, name, slug, description, hero_image_url, sort_order)
values
  ('11111111-1111-1111-1111-111111111111', 'Desert Bloom', 'desert-bloom', 'Sun-bleached linen and earthy terracotta tones inspired by arid landscapes.', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80', 1),
  ('22222222-2222-2222-2222-222222222222', 'Midnight Rodeo', 'midnight-rodeo', 'Deep indigo, worn leather textures, and tailored western silhouettes.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80', 2),
  ('33333333-3333-3333-3333-333333333333', 'Prairie Modern', 'prairie-modern', 'Minimalist workwear, raw selvedge cotton, and structured heritage tailoring.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', 3)
on conflict (slug) do nothing;

-- 2. PRODUCTS (12 Products)

-- Collection 1: Desert Bloom
insert into public.products (id, collection_id, name, slug, description, care_instructions, fabric, base_price_paise, compare_at_price_paise, is_published)
values
  ('a1111111-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Sahara Linen Overshirt', 'sahara-linen-overshirt', 'Relaxed silhouette crafted from heavy Belgian linen with brass hardware.', 'Dry clean or gentle hand wash cold.', '100% Belgian Linen', 1499900, 1799900, true),
  ('a1111111-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Terracotta Pleated Trousers', 'terracotta-pleated-trousers', 'High-waisted tailored trousers featuring deep double front pleats.', 'Dry clean only.', 'Wool Cotton Blend', 1899900, null, true),
  ('a1111111-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Dune Draped Kimono Cardigan', 'dune-draped-kimono-cardigan', 'Open-front knit cardigan woven from breathable raw silk and hemp yarns.', 'Hand wash cold flat dry.', 'Raw Silk & Hemp Yarns', 2299900, 2599900, true),
  ('a1111111-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Oasis Band Collar Shirt', 'oasis-band-collar-shirt', 'Clean mandarin collar shirt with hand-stitched detailing along the placket.', 'Machine wash gentle inside out.', '100% Organic Cotton', 1299900, null, true),

-- Collection 2: Midnight Rodeo
  ('b2222222-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'Midnight Selvedge Denim Jacket', 'midnight-selvedge-denim-jacket', '14oz Japanese raw indigo selvedge denim jacket with contrast top-stitching.', 'Do not wash for first 6 months. Spot clean.', '14oz Japanese Selvedge Cotton', 2499900, 2899900, true),
  ('b2222222-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'Rodeo Suede Fringe Vest', 'rodeo-suede-fringe-vest', 'Artisanal goat suede vest with subtle top-stitched trim and western yoke.', 'Specialist leather clean only.', '100% Italian Goat Suede', 3499900, null, true),
  ('b2222222-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'Indigo Western Pearl-Snap Shirt', 'indigo-western-pearl-snap-shirt', 'Garment-dyed indigo chambray shirt fitted with genuine mother-of-pearl snaps.', 'Machine wash cold with like colors.', '100% Indigo Cotton Chambray', 1599900, 1899900, true),
  ('b2222222-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'Outlaw Tapered Riding Pants', 'outlaw-tapered-riding-pants', 'Heavyweight twill pants reinforced with saddle stitching at tension points.', 'Machine wash cold cycle.', '100% Cotton Canvas Twill', 1999900, null, true),

-- Collection 3: Prairie Modern
  ('c3333333-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'Prairie Chore Coat', 'prairie-chore-coat', 'Structured four-pocket chore coat featuring antiqued brass rivet details.', 'Machine wash cold line dry.', 'Heavy Duck Canvas', 2199900, null, true),
  ('c3333333-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'Artisan Utility Smock', 'artisan-utility-smock', 'Over-the-head utility tunic shirt with dropped shoulders and side slits.', 'Machine wash warm.', '100% Organic Linen-Cotton', 1699900, 1999900, true),
  ('c3333333-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'Harvest Wide-Leg Trousers', 'harvest-wide-leg-trousers', 'Relaxed wide-leg trousers cut from unbleached natural cotton drill.', 'Machine wash cold.', 'Natural Cotton Drill', 1799900, null, true),
  ('c3333333-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'Fieldmaster Work Waistcoat', 'fieldmaster-work-waistcoat', 'Layering vest with notched lapel and rear brass cinch adjuster.', 'Dry clean.', 'Brushed Wool Twill', 2099900, 2399900, true)
on conflict (slug) do nothing;

-- 3. PRODUCT IMAGES
insert into public.product_images (product_id, url, alt_text, sort_order, is_primary)
values
  ('a1111111-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', 'Sahara Linen Overshirt Front View', 1, true),
  ('a1111111-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80', 'Terracotta Pleated Trousers Front View', 1, true),
  ('a1111111-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80', 'Dune Draped Kimono Cardigan View', 1, true),
  ('a1111111-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 'Oasis Band Collar Shirt View', 1, true),
  ('b2222222-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80', 'Midnight Selvedge Denim Jacket View', 1, true),
  ('b2222222-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80', 'Rodeo Suede Fringe Vest View', 1, true),
  ('b2222222-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 'Indigo Western Pearl-Snap Shirt View', 1, true),
  ('b2222222-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', 'Outlaw Tapered Riding Pants View', 1, true),
  ('c3333333-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', 'Prairie Chore Coat View', 1, true),
  ('c3333333-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80', 'Artisan Utility Smock View', 1, true),
  ('c3333333-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80', 'Harvest Wide-Leg Trousers View', 1, true),
  ('c3333333-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 'Fieldmaster Work Waistcoat View', 1, true);

-- 4. VARIANTS (XS–XL across 2–3 colorways per product)
-- Helper script insertion for Product 1 (Sahara Linen Overshirt)
insert into public.product_variants (product_id, size, color_name, color_hex, sku, inventory_count)
values
  ('a1111111-0000-0000-0000-000000000001', 'XS', 'Sandstorm', '#D4A373', 'HOB-SAH-SND-XS', 10),
  ('a1111111-0000-0000-0000-000000000001', 'S', 'Sandstorm', '#D4A373', 'HOB-SAH-SND-S', 15),
  ('a1111111-0000-0000-0000-000000000001', 'M', 'Sandstorm', '#D4A373', 'HOB-SAH-SND-M', 20),
  ('a1111111-0000-0000-0000-000000000001', 'L', 'Sandstorm', '#D4A373', 'HOB-SAH-SND-L', 12),
  ('a1111111-0000-0000-0000-000000000001', 'XL', 'Sandstorm', '#D4A373', 'HOB-SAH-SND-XL', 8),
  ('a1111111-0000-0000-0000-000000000001', 'S', 'Saddle Brown', '#6B4A31', 'HOB-SAH-SDL-S', 10),
  ('a1111111-0000-0000-0000-000000000001', 'M', 'Saddle Brown', '#6B4A31', 'HOB-SAH-SDL-M', 18),
  ('a1111111-0000-0000-0000-000000000001', 'L', 'Saddle Brown', '#6B4A31', 'HOB-SAH-SDL-L', 14),

-- Product 5 (Midnight Selvedge Denim Jacket)
  ('b2222222-0000-0000-0000-000000000001', 'S', 'Raw Indigo', '#17140F', 'HOB-JAC-IND-S', 8),
  ('b2222222-0000-0000-0000-000000000001', 'M', 'Raw Indigo', '#17140F', 'HOB-JAC-IND-M', 25),
  ('b2222222-0000-0000-0000-000000000001', 'L', 'Raw Indigo', '#17140F', 'HOB-JAC-IND-L', 15),
  ('b2222222-0000-0000-0000-000000000001', 'XL', 'Raw Indigo', '#17140F', 'HOB-JAC-IND-XL', 5),
  ('b2222222-0000-0000-0000-000000000001', 'M', 'Worn Black', '#222222', 'HOB-JAC-BLK-M', 12),
  ('b2222222-0000-0000-0000-000000000001', 'L', 'Worn Black', '#222222', 'HOB-JAC-BLK-L', 10),

-- Product 9 (Prairie Chore Coat)
  ('c3333333-0000-0000-0000-000000000001', 'XS', 'Natural Ecru', '#F1EAD8', 'HOB-CHR-ECR-XS', 6),
  ('c3333333-0000-0000-0000-000000000001', 'S', 'Natural Ecru', '#F1EAD8', 'HOB-CHR-ECR-S', 14),
  ('c3333333-0000-0000-0000-000000000001', 'M', 'Natural Ecru', '#F1EAD8', 'HOB-CHR-ECR-M', 22),
  ('c3333333-0000-0000-0000-000000000001', 'L', 'Natural Ecru', '#F1EAD8', 'HOB-CHR-ECR-L', 16),
  ('c3333333-0000-0000-0000-000000000001', 'XL', 'Natural Ecru', '#F1EAD8', 'HOB-CHR-ECR-XL', 9),
  ('c3333333-0000-0000-0000-000000000001', 'M', 'Dust Brown', '#C7BBA3', 'HOB-CHR-DST-M', 11),
  ('c3333333-0000-0000-0000-000000000001', 'L', 'Dust Brown', '#C7BBA3', 'HOB-CHR-DST-L', 13)
on conflict (sku) do nothing;
