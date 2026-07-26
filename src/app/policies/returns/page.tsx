import React from 'react';
import { PolicyLayout, type PolicySectionItem } from '@/components/sections/PolicyLayout';

const RETURN_SECTIONS: PolicySectionItem[] = [
  { id: 'return-window', title: '1. 7-Day Return & Exchange Window' },
  { id: 'condition-requirements', title: '2. Garment Condition Standards' },
  { id: 'size-exchange', title: '3. Complimentary Size Exchange Process' },
  { id: 'razorpay-refunds', title: '4. Razorpay Refund Timelines' },
];

export default function ReturnsPolicyPage() {
  return (
    <PolicyLayout
      title="Returns & Size Exchange Policy"
      subtitle="Effortless size swaps, transparent quality checks, and prompt Razorpay refunds."
      lastUpdated="January 2026"
      sections={RETURN_SECTIONS}
    >
      {/* 1. Return Window */}
      <section id="return-window" className="scroll-mt-32 space-y-3">
        <h2 className="font-display text-2xl font-semibold text-ink">
          1. 7-Day Return & Exchange Window
        </h2>
        <p>
          We want every House of Brusi garment to fit with unyielding confidence. You may request a size exchange or full return within <strong>7 calendar days</strong> of receiving your delivery.
        </p>
        <p>
          Return requests submitted after the 7-day window cannot be accommodated by our automated portal.
        </p>
      </section>

      {/* 2. Condition Requirements */}
      <section id="condition-requirements" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          2. Garment Condition Standards
        </h2>
        <p>
          Due to the delicate nature of raw indigo denim, handcrafted suede fringe, and fine Belgian linen, garments submitted for return or exchange must satisfy strict condition criteria:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-ink/80">
          <li>Unworn, unwashed, and free of perfume, makeup, or deodorant marks.</li>
          <li>All original fabric tags, sewn-in labels, and brass security seals must remain intact and attached.</li>
          <li>Garments must be returned in their original House of Brusi garment bag and box.</li>
        </ul>
        <p className="text-xs text-dust">
          * Garments returned with missing tags or visible signs of wear will be returned to the customer at their expense.
        </p>
      </section>

      {/* 3. Size Exchange */}
      <section id="size-exchange" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          3. Complimentary Size Exchange Process
        </h2>
        <p>
          Western wear silhouettes often require precise shoulder and waist tailoring. We offer <strong>one complimentary size exchange</strong> per order across India.
        </p>
        <p>
          To initiate an exchange:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-mono text-xs">
          <li>Email <strong>concierge@houseofbrusi.com</strong> with your order number and desired size.</li>
          <li>Our team will schedule a doorstep reverse pickup within 24-48 hours.</li>
          <li>Once the original garment completes quality inspection at our atelier, your replacement size is dispatched immediately via express air freight.</li>
        </ol>
      </section>

      {/* 4. Razorpay Refunds */}
      <section id="razorpay-refunds" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          4. Razorpay Refund Timelines
        </h2>
        <p>
          Approved refunds are processed directly back to your original payment method via our Razorpay payment gateway:
        </p>
        <div className="my-4 p-4 bg-ink/5 border-l-2 border-saddle rounded-r-sm font-mono text-xs space-y-1">
          <p><strong>Prepaid Credit/Debit Cards & Netbanking:</strong> 5 to 7 business days to reflect in bank statement.</p>
          <p><strong>UPI Payments (GPay, PhonePe, Paytm):</strong> 24 to 48 hours directly to linked bank account.</p>
          <p><strong>Cash on Delivery (COD) Orders:</strong> Refunded via Razorpay Payouts direct bank transfer upon providing account details.</p>
        </div>
      </section>
    </PolicyLayout>
  );
}
