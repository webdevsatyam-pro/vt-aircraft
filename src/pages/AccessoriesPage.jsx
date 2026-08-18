import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import accessoriesData from '../data/accessories.json';

export default function AccessoriesPage() {
  useSEO({
    title: 'RC Accessories, Spare Parts & Batteries | Rc Plane Hub',
    description: 'Shop official VT-Simple Trainer accessories, high-capacity 3S LiPo batteries, replacement wings, chargers, and custom carrying cases.'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['Batteries', 'Spare Parts', 'Chargers', 'Cases'];

  // Filter items
  let items = accessoriesData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort items
  if (sortBy === 'price-low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    items.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    items.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ name: 'Accessories & Spare Parts', url: '/accessories' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Official Equipment</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Accessories & Spare Parts Catalog</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Stock up on spare propellers, high-discharge 3S LiPo batteries, dual smart chargers, and replacement wing assemblies.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500">No accessories found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
}
