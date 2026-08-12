import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, BookOpen, Compass, Wind } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import trainingData from '../data/training.json';

export default function TrainingPage() {
  useSEO({
    title: 'Flight Academy & Training Manual | Rc Plane Zone',
    description: 'Master radio control flying step-by-step with the Rc Plane Zone Flight Academy: pre-flight safety checklists, trimming, pattern flying, and landing procedures.'
  });

  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklist = trainingData.preflightChecklist.length;

  return (
    <div className="space-y-16 pb-16">
      <Breadcrumbs items={[{ name: 'Training Academy', url: '/training' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Flight Training Program</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{trainingData.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          {trainingData.subtitle} Follow our structured 4-level flight curriculum designed by AMA certified flight instructors.
        </p>
      </section>

      {/* Training Curriculum Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainingData.modules.map((mod) => (
          <div key={mod.id} className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-bold rounded-full border border-blue-100">
                {mod.step}
              </span>
              <span className="text-xs text-gray-400 font-mono">{mod.duration}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{mod.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{mod.summary}</p>
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <h4 className="text-xs font-semibold text-gray-900 uppercase">Key Objectives:</h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {mod.topics.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">▪</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Pre-Flight Safety Checklist */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F3A5F] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-6">
            <div>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Interactive Flight Safety</span>
              <h2 className="text-2xl font-bold">Pre-Flight Readiness Checklist</h2>
            </div>
            <div className="px-4 py-2 bg-slate-800 rounded-2xl text-xs font-mono font-bold text-blue-300 border border-slate-700">
              Readiness: {completedCount} / {totalChecklist} Passed
            </div>
          </div>

          <div className="space-y-3">
            {trainingData.preflightChecklist.map((item, index) => {
              const isChecked = !!checkedItems[index];
              return (
                <div
                  key={index}
                  onClick={() => toggleCheck(index)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 ${
                    isChecked
                      ? 'bg-blue-900/40 border-blue-500/80 text-white'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition ${
                    isChecked ? 'bg-[#2563EB] text-white' : 'border border-slate-600'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-medium flex-1">{item}</span>
                </div>
              );
            })}
          </div>

          {completedCount === totalChecklist && (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-center text-xs font-bold text-emerald-300 animate-fade-in">
              🎉 All Pre-Flight Systems Verified Clear! You Are Cleared For Takeoff.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
