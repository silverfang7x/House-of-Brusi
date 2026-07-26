import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getRazorpayClient } from '@/lib/razorpay';
import crypto from 'crypto';

interface CreateOrderRequestPayload {
  items: Array<{
    variantId: string;
    quantity: number;
  }>;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export async function POST(request: Request) {
  try {
    const payload: CreateOrderRequestPayload = await request.json();
    const { items, shippingAddress } = payload;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty. Please select items before checking out.' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone) {
      return NextResponse.json(
        { error: 'Incomplete shipping address and contact details.' },
        { status: 400 }
      );
    }

    // 1. Initialize Supabase Service Role Client to inspect database truth
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
      return NextResponse.json(
        { error: 'Server database configuration unavailable.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 2. SERVER-SIDE SECURITY: Re-fetch every variant's real price and inventory directly from DB
    let recomputedSubtotalPaise = 0;
    const validatedOrderItems: Array<{
      productId: string;
      variantId: string;
      name: string;
      size: string;
      colorName: string;
      quantity: number;
      unitPricePaise: number;
    }> = [];

    for (const item of items) {
      // Query by variant SKU or UUID
      const { data: variantData, error: variantError } = await supabase
        .from('product_variants')
        .select('*, product:products(*)')
        .or(`sku.eq.${item.variantId},id.eq.${item.variantId}`)
        .single();

      if (variantError || !variantData) {
        return NextResponse.json(
          { error: `Garment variant "${item.variantId}" not found in current catalog.` },
          { status: 400 }
        );
      }

      const product = variantData.product;
      const requestedQty = Math.max(1, item.quantity);

      // Re-validate inventory count from database truth
      if (variantData.inventory_count < requestedQty) {
        return NextResponse.json(
          {
            error: 'Insufficient Inventory',
            details: `Garment "${product.name}" (Size ${variantData.size}, Color ${variantData.color_name}) only has ${variantData.inventory_count} remaining in stock.`,
          },
          { status: 400 }
        );
      }

      // Re-compute unit price server-side (ignore any unit price sent by client)
      const realUnitPricePaise =
        variantData.price_override_paise != null
          ? variantData.price_override_paise
          : product.base_price_paise;

      recomputedSubtotalPaise += realUnitPricePaise * requestedQty;

      validatedOrderItems.push({
        productId: product.id,
        variantId: variantData.id,
        name: product.name,
        size: variantData.size,
        colorName: variantData.color_name,
        quantity: requestedQty,
        unitPricePaise: realUnitPricePaise,
      });
    }

    // 3. Compute flat shipping fee (free for orders >= ₹10,000 / 1,000,000 paise; ₹250 / 25,000 paise below)
    const shippingFeePaise = recomputedSubtotalPaise >= 1000000 ? 0 : 25000;
    const totalOrderPaise = recomputedSubtotalPaise + shippingFeePaise;

    // 4. Generate internal database Order ID
    const dbOrderId = crypto.randomUUID();

    // 5. Create Razorpay Order via SDK
    const razorpay = getRazorpayClient();
    const rzpOrder = await razorpay.orders.create({
      amount: totalOrderPaise,
      currency: 'INR',
      receipt: `rcpt_${dbOrderId.replace(/-/g, '').slice(0, 20)}`,
      notes: {
        db_order_id: dbOrderId,
        customer_email: shippingAddress.email,
        customer_phone: shippingAddress.phone,
      },
    });

    // 6. Insert Order into Supabase with status 'pending' and razorpay_order_id
    const { error: insertOrderError } = await supabase.from('orders').insert({
      id: dbOrderId,
      user_id: null,
      status: 'pending',
      amount_paise: totalOrderPaise,
      razorpay_order_id: rzpOrder.id,
      shipping_address: shippingAddress as unknown as Record<string, unknown>,
    });

    if (insertOrderError) {
      throw new Error(`Failed to record database order: ${insertOrderError.message}`);
    }

    // 7. Insert Order Items into Supabase (do NOT decrement inventory yet)
    const orderItemsToInsert = validatedOrderItems.map((item) => ({
      order_id: dbOrderId,
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
      unit_price_paise: item.unitPricePaise,
    }));

    const { error: insertItemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (insertItemsError) {
      throw new Error(`Failed to record database order items: ${insertItemsError.message}`);
    }

    console.log(`📦 Pending order ${dbOrderId} created with Razorpay Order ID ${rzpOrder.id}.`);

    return NextResponse.json({
      success: true,
      orderId: dbOrderId,
      razorpayOrderId: rzpOrder.id,
      amountPaise: totalOrderPaise,
      subtotalPaise: recomputedSubtotalPaise,
      shippingFeePaise,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown checkout order creation error';
    console.error('❌ Order Creation Error:', message);
    return NextResponse.json(
      { error: 'Order creation failed', details: message },
      { status: 500 }
    );
  }
}
