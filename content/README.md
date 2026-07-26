# House of Brusi - Catalog Management Pipeline

This folder contains the file-based catalog system for House of Brusi. All catalog items can be created, updated, and published without writing SQL or using database GUI tools.

---

## 1. How to Add a New Product Manually

1. Open `content/products.json`.
2. Copy the product template below and append it to the JSON array.
3. Fill in all details (prices are in whole **Rupees**; the sync script automatically converts them to integer paise for Supabase):

```json
{
  "slug": "custom-tailored-jacket",
  "name": "Custom Tailored Jacket",
  "collectionSlug": "desert-bloom",
  "description": "Bespoke tailored jacket with antique brass hardware.",
  "careInstructions": "Dry clean only.",
  "fabric": "100% Belgian Linen",
  "basePriceRupees": 19999,
  "compareAtPriceRupees": 22999,
  "images": [
    {
      "url": "https://images.unsplash.com/photo-...",
      "altText": "Front View"
    }
  ],
  "variants": [
    {
      "size": "M",
      "colorName": "Sandstorm",
      "colorHex": "#D4A373",
      "sku": "HOB-JAC-SND-M",
      "inventoryCount": 10
    }
  ]
}
```

4. Save `content/products.json`.
5. Run the catalog sync command in your terminal:
   ```bash
   pnpm catalog:sync
   ```

---

## 2. Instagram-Assisted Product Drafting Workflow

Turn official `@house_of_brusi` Instagram posts into published catalog products in minutes:

1. Run the Instagram draft generator script:
   ```bash
   pnpm catalog:from-ig
   ```
2. Open `content/products.draft.json`. This file contains auto-generated product drafts from unlinked Instagram posts with pre-filled images and suggested titles/descriptions.
3. Select the drafts you want to convert into real products. Fill in pricing (`basePriceRupees`), sizes, colors, SKUs, and inventory counts (which are marked with `"FILL_ME_IN": true` placeholders).
4. Cut and move the completed product entries into `content/products.json`.
5. Run the sync command to push them live into Supabase:
   ```bash
   pnpm catalog:sync
   ```
