import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { generateFAQSchema } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import faqsData from '../data/faqs.json';

export default function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions (FAQ) | Rc Plane Hub',
    description: 'Find answers to common questions about VT-Simple Trainer assembly, gyro flight modes, battery charging, repairs, and warranty.',
    jsonLd: generateFAQSchema(faqsData)
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ['All', 'Getting Started', 'Flight Operations', 'Maintenance & Repairs', 'Shipping & Warranty'];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs items={[{ name: 'FAQ', url: '/faq' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Help & Answers</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Everything you need to know about flying, assembling, and maintaining your VT-Simple Trainer.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative pt-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions e.g. assembly, gyro, battery..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs text-gray-900 shadow-xs focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#1F3A5F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Contact Queries Callout Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm sm:text-base text-amber-950 uppercase tracking-wide">Have Any Queries or Questions?</h3>
            <p className="text-xs sm:text-sm text-amber-900 font-medium">
              Call us directly to talk and get instant support for your RC plane build!
            </p>
          </div>
          <a
            href="tel:+918004787983"
            className="px-6 py-3 bg-[#1F3A5F] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-extrabold rounded-2xl flex items-center gap-2 transition duration-200 shadow-md active:scale-95 whitespace-nowrap"
          >
            <span>Call +91 80047 87983</span>
          </a>
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-[#2563EB] transition"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-xs text-gray-500">
            No matching questions found. Try searching for different keywords or contact support.
          </div>
        )}
      </section>
    </div>
  );
}
