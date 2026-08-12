import React, { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import galleryData from '../data/gallery.json';

export default function GalleryPage() {
  useSEO({
    title: 'Photo Gallery | VT-Simple Trainer In Action',
    description: 'High-resolution photo gallery showcasing the VT-Simple Trainer in flight, studio product details, and field action photography.'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const photoId = searchParams.get('photo');
    if (photoId) {
      const item = galleryData.find((g) => g.id === photoId);
      if (item) {
        setSelectedImage(item);
      }
    }
  }, []);

  const categories = ['All', 'In-Flight', 'Studio', 'Action', 'Details'];

  const filteredGallery = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ name: 'Gallery', url: '/gallery' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">High Resolution Media</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Rc Plane Zone Image Gallery</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Explore stunning aerial flight photography and studio closeups of the VT-Simple Trainer.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
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

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 aspect-4/3 bg-gray-100 relative shadow-xs hover:shadow-xl transition-all duration-300 card-hover"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">{item.category}</span>
              <h3 className="font-semibold text-sm mt-0.5">{item.title}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-gray-800 shadow-2xl relative text-white"
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 space-y-1">
              <span className="text-xs font-bold text-[#2563EB] uppercase">{selectedImage.category}</span>
              <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              <p className="text-xs text-gray-400">{selectedImage.caption}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800/80 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
