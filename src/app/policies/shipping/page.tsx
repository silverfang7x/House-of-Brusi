import React from 'react';
import { PolicyLayout, type PolicySectionItem } from '@/components/sections/PolicyLayout';

const SHIPPING_SECTIONS: PolicySectionItem[] = [
  { id: 'dispatch-timeline', title: '1. Order Processing & Dispatch' },
  { id: 'delivery-zones', title: '2. Delivery Timeframes & Shipping Charges' },
  { id: 'cash-on-delivery', title: '3. Cash on Delivery (COD) Terms' },
  { id: 'order-tracking', title: '4. Tracking & Insured Transit' },
];

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping & Fulfillment Policy"
      subtitle="Transparent logistics, small-batch handling, and insured delivery across India."
      lastUpdated="January 2026"
      sections={SHIPPING_SECTIONS}
    >
      {/* 1. Order Processing */}
      <section id="dispatch-timeline" className="scroll-mt-32 space-y-3">
        <h2 className="font-display text-2xl font-semibold text-ink">
          1. Order Processing & Dispatch
        </h2>
        <p>
          Every House of Brusi garment undergoes a final hand-inspection and steam-pressing at our atelier before dispatch. Standard orders are processed and shipped within <strong>1 to 3 business days</strong> (excluding Sundays and national holidays).
        </p>
        <p>
          For bespoke tailoring modifications or made-to-order outerwear pieces, processing may require up to 5 business days. You will receive an automated dispatch notification with courier tracking details as soon as your package leaves our studio.
        </p>
      </section>

      {/* 2. Delivery Timeframes & Charges */}
      <section id="delivery-zones" className="scroll-mt-32 space-y-4 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          2. Delivery Timeframes & Shipping Charges
        </h2>
        <p>
          We partner with premium air-freight couriers (BlueDart, Delhivery Air, and DTDC Express) to ensure rapid and secure transit across all Indian pincodes.
        </p>

        {/* Tabulated Shipping Data */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left font-mono text-xs border border-dust/30">
            <thead className="bg-ink text-bone">
              <tr>
                <th className="p-3">Destination Zone</th>
                <th className="p-3">Estimated Transit</th>
                <th className="p-3">Orders Under ₹10,000</th>
                <th className="p-3">Orders ₹10,000+</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dust/20 bg-bone">
              <tr>
                <td className="p-3 font-bold">Tier 1 Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata)</td>
                <td className="p-3">2 - 4 Business Days</td>
                <td className="p-3">₹250 Flat Rate</td>
                <td className="p-3 text-saddle font-bold">COMPLIMENTARY</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Tier 2 & Tier 3 Regional Cities</td>
                <td className="p-3">4 - 6 Business Days</td>
                <td className="p-3">₹350 Flat Rate</td>
                <td className="p-3 text-saddle font-bold">COMPLIMENTARY</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Special Pincodes (North East, J&K, Island Territories)</td>
                <td className="p-3">5 - 8 Business Days</td>
                <td className="p-3">₹450 Flat Rate</td>
                <td className="p-3 text-saddle font-bold">COMPLIMENTARY</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-dust">
          * Complimentary express shipping is automatically applied at checkout for all cart sub-totals exceeding ₹10,000.
        </p>
      </section>

      {/* 3. Cash on Delivery */}
      <section id="cash-on-delivery" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          3. Cash on Delivery (COD) Terms
        </h2>
        <p>
          Cash on Delivery is available for selected pincodes on orders up to <strong>₹15,000</strong>. A non-refundable COD convenience fee of <strong>₹200</strong> applies to cover courier cash-handling protocols.
        </p>
        <p>
          For security and order verification, all COD orders require an automated WhatsApp or OTP confirmation prior to dispatch. If a COD shipment is rejected at the doorstep without prior cancellation notice, COD privileges for that account will be suspended.
        </p>
      </section>

      {/* 4. Tracking & Insured Transit */}
      <section id="order-tracking" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          4. Tracking & Insured Transit
        </h2>
        <p>
          All House of Brusi shipments are 100% insured against loss or transit damage. Upon dispatch, a direct tracking link will be sent via SMS and email.
        </p>
        <p>
          If your package arrives with damaged external security tape or tampered packaging, please refuse delivery and immediately notify our atelier concierge at <strong>concierge@houseofbrusi.com</strong>.
        </p>
      </section>
    </PolicyLayout>
  );
}
