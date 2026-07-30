import React from 'react';
import { Check } from 'lucide-react';

export default function SpecTable({ categories, comparisonTable }) {
  return (
    <div className="space-y-12">
      {/* Spec Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories?.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              {cat.name}
            </h4>
            <div className="divide-y divide-gray-100">
              {cat.specs.map((s, sIdx) => (
                <div key={sIdx} className="py-2.5 flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">{s.label}</span>
                  <span className="text-gray-900 font-semibold text-right ml-4">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Competitive Benchmark Comparison Table */}
      {comparisonTable && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs overflow-x-auto">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Technical Benchmark Comparison</h4>
          <p className="text-sm text-gray-500 mb-6">How the VT-Simple Trainer stacks up against typical trainer RC aircraft.</p>

          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50/50">
                <th className="py-3 px-4">Feature / Engineering</th>
                <th className="py-3 px-4 text-[#2563EB] font-bold bg-blue-50/50 rounded-t-lg">VT-Simple Trainer</th>
                <th className="py-3 px-4">Generic Trainer A</th>
                <th className="py-3 px-4">Generic Trainer B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {comparisonTable.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-gray-50/50 transition">
                  <td className="py-3.5 px-4 font-medium text-gray-900">{row.feature}</td>
                  <td className="py-3.5 px-4 font-bold text-[#1F3A5F] bg-blue-50/30 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#2563EB]" />
                    {row.vtSimpleTrainer}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{row.competitorA}</td>
                  <td className="py-3.5 px-4 text-gray-600">{row.competitorB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
