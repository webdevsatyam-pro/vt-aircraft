import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import VideoModal from '../components/VideoModal';
import videosData from '../data/videos.json';

export default function VideosPage() {
  useSEO({
    title: 'Flight Videos & Tutorials | Rc Flight Zone',
    description: 'Watch flight video demonstrations, maiden flight guides, and gyro setup tutorials for the VT-Simple Trainer RC plane.'
  });

  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Flight Demos', 'Tutorials', 'Training'];

  const filteredVideos = selectedCategory === 'All'
    ? videosData
    : videosData.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ name: 'Videos', url: '/videos' }]} />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Aviation Video Vault</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Rc Flight Zone Video Library</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Learn takeoff routines, flight trimming, and gyro mode selection directly from our master pilots.
        </p>

        {/* Category Tabs */}
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

      {/* Video Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideo(vid)}
            className="group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 card-hover flex flex-col"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#2563EB]/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition duration-300">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg">
                {vid.duration}
              </span>
            </div>

            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">{vid.category}</span>
                <h3 className="font-bold text-gray-900 text-base mt-1 group-hover:text-[#2563EB] transition-colors">{vid.title}</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{vid.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#2563EB] font-semibold">
                <span>Watch Video Now</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}

