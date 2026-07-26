export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          hero_image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          hero_image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          hero_image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          collection_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          care_instructions: string | null;
          fabric: string | null;
          base_price_paise: number;
          compare_at_price_paise: number | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          collection_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          care_instructions?: string | null;
          fabric?: string | null;
          base_price_paise: number;
          compare_at_price_paise?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          collection_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          care_instructions?: string | null;
          fabric?: string | null;
          base_price_paise?: number;
          compare_at_price_paise?: number | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size: string;
          color_name: string;
          color_hex: string;
          sku: string;
          inventory_count: number;
          price_override_paise: number | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          size: string;
          color_name: string;
          color_hex: string;
          sku: string;
          inventory_count?: number;
          price_override_paise?: number | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          size?: string;
          color_name?: string;
          color_hex?: string;
          sku?: string;
          inventory_count?: number;
          price_override_paise?: number | null;
        };
      };
      customers: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          created_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          customer_id: string;
          label: string | null;
          line1: string;
          line2: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default: boolean;
        };
        Insert: {
          id?: string;
          customer_id: string;
          label?: string | null;
          line1: string;
          line2?: string | null;
          city: string;
          state: string;
          pincode: string;
          is_default?: boolean;
        };
        Update: {
          id?: string;
          customer_id?: string;
          label?: string | null;
          line1?: string;
          line2?: string | null;
          city?: string;
          state?: string;
          pincode?: string;
          is_default?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string | null;
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal_paise: number;
          shipping_paise: number;
          total_paise: number;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          shipping_address_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal_paise: number;
          shipping_paise?: number;
          total_paise: number;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          shipping_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          subtotal_paise?: number;
          shipping_paise?: number;
          total_paise?: number;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          shipping_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_variant_id: string | null;
          quantity: number;
          unit_price_paise: number;
          subtotal_paise: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_variant_id?: string | null;
          quantity: number;
          unit_price_paise: number;
          subtotal_paise: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_variant_id?: string | null;
          quantity?: number;
          unit_price_paise?: number;
          subtotal_paise?: number;
        };
      };
      instagram_posts: {
        Row: {
          id: string;
          instagram_post_id: string;
          media_url: string;
          caption: string | null;
          permalink: string | null;
          posted_at: string | null;
          linked_product_id: string | null;
          synced_at: string;
        };
        Insert: {
          id?: string;
          instagram_post_id: string;
          media_url: string;
          caption?: string | null;
          permalink?: string | null;
          posted_at?: string | null;
          linked_product_id?: string | null;
          synced_at?: string;
        };
        Update: {
          id?: string;
          instagram_post_id?: string;
          media_url?: string;
          caption?: string | null;
          permalink?: string | null;
          posted_at?: string | null;
          linked_product_id?: string | null;
          synced_at?: string;
        };
      };
    };
  };
}
