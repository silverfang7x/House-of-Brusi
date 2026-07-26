import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    // 1. CRITICAL: Read RAW request body as text BEFORE any JSON parsing
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      console.warn('⚠️ Missing x-razorpay-signature header on webhook request.');
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      );
    }

    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET ||
      process.env.RAZORPAY_KEY_SECRET ||
      'razorpay_secret_placeholder';

    // 2. Verify raw request body HMAC SHA-256 signature
    const isValidSignature = verifyWebhookSignature({
      rawBody,
      signature,
      secret: webhookSecret,
    });

    if (!isValidSignature) {
      console.error('❌ Razorpay Webhook signature verification failed!');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    // 3. Parse JSON event after signature verification succeeds
    const event = JSON.parse(rawBody);
    const eventType = event.event;

    console.log(`📡 Received Razorpay Webhook Event: ${eventType}`);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
      return NextResponse.json(
        { error: 'Server database configuration unavailable.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (eventType === 'order.paid' || eventType === 'payment.captured') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const rzpOrderId = paymentEntity?.order_id || orderEntity?.id;
      const rzpPaymentId = paymentEntity?.id;

      if (!rzpOrderId) {
        return NextResponse.json(
          { error: 'Webhook payload missing razorpay_order_id' },
          { status: 400 }
        );
      }

      // Fetch corresponding order in database
      const { data: orderData, error: orderFetchError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('razorpay_order_id', rzpOrderId)
        .single();

      if (orderFetchError || !orderData) {
        console.warn(`⚠️ Order with razorpay_order_id ${rzpOrderId} not found.`);
        return NextResponse.json({ success: true, message: 'Order not found' });
      }

      // IDEMPOTENCY GUARD: If order is already paid, no-op immediately
      if (orderData.status === 'paid') {
        console.log(`✅ Webhook: Order ${orderData.id} already marked paid. Skipping.`);
        return NextResponse.json({ success: true, message: 'Already processed' });
      }

      // Update order status to paid
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          razorpay_payment_id: rzpPaymentId || orderData.razorpay_payment_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderData.id)
        .eq('status', 'pending');

      if (updateError) {
        throw new Error(`Webhook order status update failed: ${updateError.message}`);
      }

      // Decrement product variant inventory
      const orderItems = orderData.order_items || [];
      for (const item of orderItems) {
        if (item.variant_id) {
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

      console.log(`🎉 Webhook: Order ${orderData.id} successfully marked PAID & inventory decremented.`);
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const rzpOrderId = paymentEntity?.order_id;

      if (rzpOrderId) {
        await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('razorpay_order_id', rzpOrderId)
          .eq('status', 'pending');
        console.log(`⚠️ Webhook: Payment failed for Razorpay Order ${rzpOrderId}. Marked cancelled.`);
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error';
    console.error('❌ Razorpay Webhook Error:', message);
    return NextResponse.json(
      { error: 'Webhook handling error', details: message },
      { status: 500 }
    );
  }
}
