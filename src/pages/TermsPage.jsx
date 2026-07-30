import React from 'react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsPage() {
  useSEO({
    title: 'Terms of Service | VT Aircraft',
    description: 'VT Aircraft Terms & Conditions for RC aircraft sales and flight operations safety.'
  });

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xs text-xs sm:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4">Terms & Conditions of Sale</h1>
        <p>Last Updated: January 2026</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">1. Operating Regulations & Safety</h2>
        <p>Purchasers of VT Aircraft products are responsible for operating radio-controlled aircraft in compliance with local aviation authorities (such as FAA in the United States, EASA in Europe, or equivalent regional bodies). Flight should take place in open airfields away from crowds, power lines, and airports.</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">2. Warranty Coverage</h2>
        <p>VT Aircraft guarantees factory defect coverage for 12 months. Damage resulting from pilot error, intentional misuse, or unauthorized hardware modifications is excluded from warranty replacements.</p>

        <h2 className="text-base font-bold text-gray-900 pt-2">3. Limitation of Liability</h2>
        <p>VT Aircraft Inc. shall not be liable for incidental or consequential damages arising from the operation or crash of radio-controlled models.</p>
      </section>
    </div>
  );
}
