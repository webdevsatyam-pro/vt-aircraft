import React from 'react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy | Rc Flight Zone',
    description: 'Rc Flight Zone Privacy Policy - Learn how we collect, protect, and handle your data.'
  });

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xs text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4">Privacy Policy</h1>
        <p>Last Updated: January 2026</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">1. Information We Collect</h2>
        <p>When you purchase from Rc Flight Zone or subscribe to our newsletter, we collect personal information such as your name, shipping address, email address, phone number, and payment information processed securely through 256-bit encrypted gateways.</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">2. How We Use Your Data</h2>
        <p>Your information is strictly utilized for order fulfillment, shipment tracking updates, warranty registration, and optional promotional Flight Club updates. We never sell or share your personal information with third-party advertisers.</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">3. Security Standards</h2>
        <p>Rc Flight Zone implements industry-standard Transport Layer Security (TLS/SSL) technology to protect transaction data during transmission.</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">4. Contacting Privacy Officers</h2>
        <p>If you wish to access, correct, or delete your stored account data, please email privacy@rcflightzone.com.</p>
      </section>
    </div>
  );
}
