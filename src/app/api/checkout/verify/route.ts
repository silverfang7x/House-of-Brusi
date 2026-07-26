import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyPaymentSignature } from '@/lib/razorpay';

interface VerifyPaymentPayload {
  orderId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export async function POST(request: Request) {
  try {
    const payload: VerifyPaymentPayload = await request.json();
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = payload;

    if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay verification credentials.' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'razorpay_secret_placeholder';

    // 1. Verify HMAC SHA-256 Signature (orderId|paymentId)
    const isValidSignature = verifyPaymentSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
      keySecret,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
      return NextResponse.json(
        { error: 'Server database configuration unavailable.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (!isValidSignature) {
      console.warn(`🔒 Payment signature verification failed for order ${orderId}. Marking cancelled.`);
      await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId);
      return NextResponse.json(
        { error: 'Payment signature verification failed. Order cancelled.' },
        { status: 400 }
      );
    }

    // 2. Fetch order to perform Idempotent fulfillment
    const { data: orderData, error: orderFetchError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();

    if (orderFetchError || !orderData) {
      return NextResponse.json(
        { error: `Order ${orderId} not found in database.` },
        { status: 404 }
      );
    }

    // IDEMPOTENCY GUARD: If order is already paid (e.g. webhook processed it first), return success without double-decrementing
    if (orderData.status === 'paid') {
      console.log(`✅ Order ${orderId} is already marked paid. Skipping duplicate fulfillment.`);
      return NextResponse.json({ success: true, message: 'Order already fulfilled.' });
    }

    // 3. Mark order as 'paid' and record payment ID
    const { error: updateOrderError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpayPaymentId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .eq('status', 'pending'); // Conditional update guard

    if (updateOrderError) {
      throw new Error(`Failed to update order status to paid: ${updateOrderError.message}`);
    }

    // 4. Decrement inventory count for each variant in order_items
    const orderItems = orderData.order_items || [];
    for (const item of orderItems) {
      if (item.variant_id) {
        // Fetch current variant inventory to compute decremented count safely
        const { data: variant } = await supabase
          .from('product_variants')
          .select('inventory_count')
          .eq('id', item.variant_id)
          .single();

        if (variant) {
          const newInventory = Math.max(0, variant.inventory_count - item.quantity);
          await supabase
            .from('product_variants')
            .update({ inventory_count: newInventory })
            .eq('id', item.variant_id);
        }
      }
    }

    console.log(`🎉 Order ${orderId} successfully verified, marked PAID, and inventory decremented.`);

    return NextResponse.json({
      success: true,
      orderId,
      status: 'paid',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown payment verification error';
    console.error('❌ Payment Verification Error:', message);
    return NextResponse.json(
      { error: 'Payment verification failed', details: message },
      { status: 500 }
    );
  }
}
