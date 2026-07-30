import React from 'react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import SpecTable from '../components/SpecTable';
import specsData from '../data/specifications.json';

export default function SpecificationsPage() {
  useSEO({
    title: 'Technical Specifications | VT-Simple Trainer',
    description: 'Detailed engineering specifications for the VT-Simple Trainer RC aircraft including wingspan, motor, ESC, battery, flying weight, and competitive benchmarks.'
  });

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'Specifications', url: '/specifications' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Aero Engineering Data</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">VT-Simple Trainer Specifications</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Comprehensive physical dimensions, electronic component ratings, and performance comparison benchmarks.
        </p>
      </section>

      {/* Main Spec Tables */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpecTable
          categories={specsData.categories}
          comparisonTable={specsData.comparisonTable}
        />
      </section>
    </div>
  );
}
