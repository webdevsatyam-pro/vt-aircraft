import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

import productsData from '../data/products.json';
import accessoriesData from '../data/accessories.json';

export default function ShopPage() {
  useSEO({
    title: 'Shop RC Aircraft & Gear | Rc Flight Zone Store',
    description: 'Browse the full store catalog of Rc Flight Zone: RTF planes, PNP packages, batteries, radios, replacement wings, and flight simulators.'
  });

  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchFromUrl]);

  // Combine products and accessories for full store experience
  const allCatalogItems = [...productsData, ...accessoriesData];
  const categories = ['Aircraft', 'Accessories', 'Batteries', 'Spare Parts', 'Chargers', 'Cases'];

  // Filtering
  let items = allCatalogItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (sortBy === 'price-low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    items.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ name: 'Shop Store', url: '/shop' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Official VT Store</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">RC Aircraft & Equipment Catalog</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Choose from complete Ready-To-Fly kits, Plug-N-Play models, and genuine factory replacement components.
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

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 space-y-2">
            <p className="text-base font-semibold text-gray-900">No products found</p>
            <p className="text-xs text-gray-500">Try adjusting your search terms or clearing the active filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-xl hover:bg-blue-600 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
