import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Razorpay SDK Node Instance
 */
export function getRazorpayClient(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes('placeholder')) {
    console.warn('⚠️ Razorpay credentials unconfigured or using placeholders.');
  }

  return new Razorpay({
    key_id: keyId || 'rzp_test_placeholder',
    key_secret: keySecret || 'razorpay_secret_placeholder',
  });
}

/**
 * Verify client payment signature (orderId|paymentId) against Razorpay Key Secret
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
  keySecret,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
  keySecret: string;
}): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch (err) {
    console.error('❌ Error during payment signature verification:', err);
    return false;
  }
}

/**
 * Verify raw request body webhook signature against Razorpay Webhook Secret
 */
export function verifyWebhookSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string;
  secret: string;
}): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch (err) {
    console.error('❌ Error during webhook signature verification:', err);
    return false;
  }
}
