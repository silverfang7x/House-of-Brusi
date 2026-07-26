import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, ShoppingBag } from 'lucide-react';
import { getShopTheGramPosts, type InstagramPostWithProduct } from '@/lib/supabase/queries/instagram';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StitchedLine } from '@/components/motion/StitchedLine';

export const revalidate = 3600; // Cache and revalidate hourly

const FALLBACK_POSTS: InstagramPostWithProduct[] = [
  {
    id: 'fb-1',
    instagram_post_id: 'fb_post_1',
    media_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    caption: 'Sahara Linen Overshirt paired with antique brass hardware. #HouseOfBrusi',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: 'a1111111-0000-0000-0000-000000000001',
    synced_at: new Date().toISOString(),
    linked_product: {
      id: 'a1111111-0000-0000-0000-000000000001',
      name: 'Sahara Linen Overshirt',
      slug: 'sahara-linen-overshirt',
    },
  },
  {
    id: 'fb-2',
    instagram_post_id: 'fb_post_2',
    media_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    caption: 'Hand-stitched denim details in raw indigo selvedge. #AtelierDetails',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: null,
    synced_at: new Date().toISOString(),
  },
  {
    id: 'fb-3',
    instagram_post_id: 'fb_post_3',
    media_url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    caption: 'Rodeo Suede Fringe Vest crafted in Italian goat suede. #WesternWear',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: 'b2222222-0000-0000-0000-000000000002',
    synced_at: new Date().toISOString(),
    linked_product: {
      id: 'b2222222-0000-0000-0000-000000000002',
      name: 'Rodeo Suede Fringe Vest',
      slug: 'rodeo-suede-fringe-vest',
    },
  },
  {
    id: 'fb-4',
    instagram_post_id: 'fb_post_4',
    media_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    caption: 'Mother-of-pearl snap western shirt in garment-dyed chambray. #MidnightRodeo',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: null,
    synced_at: new Date().toISOString(),
  },
  {
    id: 'fb-5',
    instagram_post_id: 'fb_post_5',
    media_url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    caption: 'Prairie Chore Coat cut from heavy duck canvas twill. #PrairieModern',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: 'c3333333-0000-0000-0000-000000000001',
    synced_at: new Date().toISOString(),
    linked_product: {
      id: 'c3333333-0000-0000-0000-000000000001',
      name: 'Prairie Chore Coat',
      slug: 'prairie-chore-coat',
    },
  },
  {
    id: 'fb-6',
    instagram_post_id: 'fb_post_6',
    media_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    caption: 'Sun-bleached linen duster drapes in high prairie light. #BespokeLuxury',
    permalink: 'https://instagram.com/house_of_brusi',
    posted_at: new Date().toISOString(),
    linked_product_id: null,
    synced_at: new Date().toISOString(),
  },
];

export async function ShopTheGram() {
  const livePosts = await getShopTheGramPosts(6);
  const postsToRender = livePosts.length >= 6 ? livePosts : [...livePosts, ...FALLBACK_POSTS.slice(livePosts.length)];

  return (
    <section className="bg-bone text-ink py-24 border-b border-dust/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll className="flex flex-col items-center text-center mb-16">
          <div className="w-36 mb-4">
            <StitchedLine />
          </div>
          <span className="font-mono text-xs text-brass uppercase tracking-widest flex items-center gap-1.5">
            <Instagram className="h-4 w-4" /> @house_of_brusi
          </span>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-ink">
            Shop The Gram
          </h2>
          <p className="mt-3 font-body text-base text-dust max-w-lg">
            Live editorial captures straight from our studio and prairie horizons.
          </p>
        </RevealOnScroll>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {postsToRender.map((post) => {
            const hasProductLink = Boolean(post.linked_product?.slug || post.linked_product_id);
            const productSlug = post.linked_product?.slug;
            const captionText = post.caption || 'House of Brusi Instagram Post';

            return (
              <RevealOnScroll key={post.id}>
                <div className="group relative aspect-square w-full overflow-hidden rounded-sm bg-dust/10 shadow-md">
                  <Image
                    src={post.media_url}
                    alt={captionText}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-between p-3 text-center">
                    <span className="font-mono text-[10px] text-brass uppercase tracking-wider">
                      @house_of_brusi
                    </span>

                    {hasProductLink && productSlug ? (
                      <Link
                        href={`/products/${productSlug}`}
                        className="inline-flex items-center gap-1 bg-saddle text-bone px-3 py-1.5 text-xs font-mono rounded-sm border border-brass/40 shadow-lg hover:bg-brass hover:text-ink transition-colors"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Shop This Look</span>
                      </Link>
                    ) : (
                      <a
                        href={post.permalink || 'https://instagram.com/house_of_brusi'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-bone hover:text-brass transition-colors p-2"
                        aria-label="View post on Instagram"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}

                    <p className="font-body text-[11px] text-dust line-clamp-2 leading-tight">
                      {captionText}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
