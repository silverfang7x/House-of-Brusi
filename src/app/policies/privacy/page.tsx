import React from 'react';
import { PolicyLayout, type PolicySectionItem } from '@/components/sections/PolicyLayout';

const PRIVACY_SECTIONS: PolicySectionItem[] = [
  { id: 'data-collection', title: '1. Personal Information Collected' },
  { id: 'payment-security', title: '2. Razorpay Payment Gateway Security' },
  { id: 'data-usage', title: '3. Order Fulfillment & Usage' },
  { id: 'data-rights', title: '4. Data Deletion & Rights Requests' },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy & Data Protection Policy"
      subtitle="Strict data confidentiality, PCI-DSS payment compliance, and transparent data rights."
      lastUpdated="January 2026"
      sections={PRIVACY_SECTIONS}
    >
      {/* 1. Data Collection */}
      <section id="data-collection" className="scroll-mt-32 space-y-3">
        <h2 className="font-display text-2xl font-semibold text-ink">
          1. Personal Information Collected
        </h2>
        <p>
          To process your bespoke orders and provide atelier client services, House of Brusi collects only essential customer information:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-ink/80">
          <li><strong>Contact Details:</strong> Full name, email address, mobile phone number.</li>
          <li><strong>Delivery Address:</strong> Shipping and billing street addresses, pincode, city.</li>
          <li><strong>Order History:</strong> Purchasing records, size preferences, and tailored exchange history.</li>
        </ul>
      </section>

      {/* 2. Payment Security */}
      <section id="payment-security" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          2. Razorpay Payment Gateway Security
        </h2>
        <p>
          <strong>House of Brusi never stores, processes, or retains your credit card numbers, CVVs, netbanking credentials, or UPI PINs on our servers.</strong>
        </p>
        <p>
          All monetary transactions are processed directly by <strong>Razorpay Software Private Limited</strong> using 256-bit SSL encryption and Level 1 PCI-DSS compliant infrastructure. When you enter card or payment details at checkout, they pass securely to Razorpay&apos;s encrypted vault.
        </p>
      </section>

      {/* 3. Data Usage */}
      <section id="data-usage" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          3. Order Fulfillment & Usage
        </h2>
        <p>
          Your personal information is strictly utilized to process transactions, arrange insured logistics with courier partners, and send dispatch notifications.
        </p>
        <p>
          We do not sell, rent, or trade client personal data to third-party advertisers or data brokers under any circumstances.
        </p>
      </section>

      {/* 4. Data Rights */}
      <section id="data-rights" className="scroll-mt-32 space-y-3 border-t border-dust/30 pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          4. Data Deletion & Rights Requests
        </h2>
        <p>
          You retain full ownership of your personal data. You may request a copy of your stored order records or demand permanent deletion of your account and address data at any time.
        </p>
        <p>
          To submit a data access or deletion request, please email our privacy officer at <strong>concierge@houseofbrusi.com</strong> with the subject line <em>&quot;Personal Data Request&quot;</em>. All verified deletion requests are processed within 14 business days.
        </p>
      </section>
    </PolicyLayout>
  );
}
