-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. COLLECTIONS TABLE
create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  hero_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 2. PRODUCTS TABLE
create table public.products (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references public.collections(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  care_instructions text,
  fabric text,
  base_price_paise int not null,
  compare_at_price_paise int,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. PRODUCT IMAGES TABLE
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int default 0,
  is_primary boolean default false
);

-- 4. PRODUCT VARIANTS TABLE
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null,
  color_name text not null,
  color_hex text not null,
  sku text unique not null,
  inventory_count int default 0,
  price_override_paise int
);

-- 5. CUSTOMERS TABLE
create table public.customers (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- 6. ADDRESSES TABLE
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  label text,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean default false
);

-- 7. ORDERS TABLE
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  status text not null check (status in ('pending','paid','shipped','delivered','cancelled','refunded')) default 'pending',
  subtotal_paise int not null,
  shipping_paise int default 0,
  total_paise int not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  shipping_address_id uuid references public.addresses(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. ORDER ITEMS TABLE
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_variant_id uuid references public.product_variants(id) on delete set null,
  quantity int not null,
  unit_price_paise int not null,
  subtotal_paise int not null
);

-- 9. INSTAGRAM POSTS TABLE
create table public.instagram_posts (
  id uuid primary key default gen_random_uuid(),
  instagram_post_id text unique not null,
  media_url text not null,
  caption text,
  permalink text,
  posted_at timestamptz,
  linked_product_id uuid references public.products(id) on delete set null,
  synced_at timestamptz default now()
);

-- INDEXES
create index idx_collections_slug on public.collections(slug);
create index idx_products_slug on public.products(slug);
create index idx_products_collection_id on public.products(collection_id);
create index idx_product_variants_sku on public.product_variants(sku);
create index idx_product_variants_product_id on public.product_variants(product_id);
create index idx_product_images_product_id on public.product_images(product_id);
create index idx_orders_customer_id on public.orders(customer_id);
create index idx_order_items_order_id on public.order_items(order_id);

-- TRIGGER FOR UPDATED_AT
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at_column();

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at_column();

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.customers enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.instagram_posts enable row level security;

-- Public read access for collections, published products, images, variants, instagram posts
create policy "Allow public select on collections" on public.collections
  for select using (true);

create policy "Allow public select on published products" on public.products
  for select using (is_published = true);

create policy "Allow public select on product images" on public.product_images
  for select using (
    exists (
      select 1 from public.products
      where products.id = product_images.product_id
      and products.is_published = true
    )
  );

create policy "Allow public select on product variants" on public.product_variants
  for select using (
    exists (
      select 1 from public.products
      where products.id = product_variants.product_id
      and products.is_published = true
    )
  );

create policy "Allow public select on instagram posts" on public.instagram_posts
  for select using (true);

-- Customers table policies
create policy "Customers can view their own profile" on public.customers
  for select using (auth.uid() = id);

create policy "Customers can update their own profile" on public.customers
  for update using (auth.uid() = id);

-- Addresses table policies
create policy "Customers can view their own addresses" on public.addresses
  for select using (auth.uid() = customer_id);

create policy "Customers can insert their own addresses" on public.addresses
  for insert with check (auth.uid() = customer_id);

create policy "Customers can update their own addresses" on public.addresses
  for update using (auth.uid() = customer_id);

create policy "Customers can delete their own addresses" on public.addresses
  for delete using (auth.uid() = customer_id);

-- Orders and Order Items table policies (Selectable by owner, insertable/updateable ONLY by service role)
create policy "Customers can view their own orders" on public.orders
  for select using (auth.uid() = customer_id);

create policy "Customers can view their own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.customer_id = auth.uid()
    )
  );
