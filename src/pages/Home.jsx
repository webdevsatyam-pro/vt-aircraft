import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plane, ShieldCheck, Zap, Award, ChevronRight, Play, ArrowRight, Check, Star, HelpCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import FlightAnimation from '../components/FlightAnimation';
import ProductCard from '../components/ProductCard';
import VideoModal from '../components/VideoModal';
import RatingStars from '../components/RatingStars';

import productsData from '../data/products.json';
import galleryData from '../data/gallery.json';
import videosData from '../data/videos.json';
import testimonialsData from '../data/testimonials.json';
import faqsData from '../data/faqs.json';

export default function Home() {
  useSEO({
    title: 'Rc Flight Zone | Premium RC Aircraft & VT-Simple Trainer',
    description: 'Explore high-performance, crash-resistant RC planes, trainer aircraft, accessories, and replacement parts. Shop premium RC gear engineered for everyone.'
  });

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const primaryProduct = productsData[0]; // RTF
  const featuredProducts = productsData.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
                <Plane className="w-4 h-4" /> Next-Gen RC Flight Platform
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.1]">
                Fly Premium RC <br />
                <span className="text-gradient">Planes & Gear.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              Discover high-performance, ultra-durable RC planes and accessories. Engineered for ultimate stability, crash resistance, and premium flight experience right out of the box.
            </motion.p>

            {/* Quick Hero Value Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-700 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>VT-Stabilize 6-Axis Gyro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>1-Click Panic Recovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>&lt; 10 Minute Tool-Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>15 Min Battery Flight Time</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                to="/product/vt-simple-trainer-rtf"
                className="px-6 py-3.5 bg-[#1F3A5F] hover:bg-[#2563EB] text-white font-semibold text-sm rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <span>Buy VT-Simple Trainer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setActiveVideo(videosData[0])}
                className="px-6 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-semibold text-sm rounded-2xl shadow-xs transition-all duration-200 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Flight Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Right Product Showcase Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white group">
              <Link to="/product/vt-simple-trainer-rtf" className="block overflow-hidden">
                <img
                  src="/src/assets/images/vt_trainer_hero_1784882888882.jpg"
                  alt="VT-Simple Trainer RC Airplane"
                  className="w-full h-[380px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">Flagship RC Aircraft</span>
                <h2 className="text-2xl font-bold">VT-Simple Trainer RTF</h2>
                <div className="flex items-center justify-between mt-2 pointer-events-auto">
                  <span className="text-xl font-extrabold">₹1,399.00 <span className="text-xs text-gray-300 line-through font-normal">₹1,749.00</span></span>
                  <Link
                    to="/product/vt-simple-trainer-rtf"
                    className="px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-xl hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. PERFORMANCE STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F3A5F] text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/60">
          <div className="text-center space-y-1 pt-4 sm:pt-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] font-mono">1100 mm</span>
            <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Wingspan</p>
          </div>
          <div className="text-center space-y-1 pt-4 sm:pt-0 sm:pl-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">15 Mins</span>
            <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Flight Time / Battery</p>
          </div>
          <div className="text-center space-y-1 pt-4 sm:pt-0 sm:pl-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] font-mono">1200 m</span>
            <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Control Range</p>
          </div>
          <div className="text-center space-y-1 pt-4 sm:pt-0 sm:pl-4">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">&lt; 10 Mins</span>
            <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Tool-Free Assembly</p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FLIGHT GYRO ANIMATION SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Proprietary Gyro Technology</h2>
          <p className="text-sm text-gray-500 mt-2">Test how VT-Stabilize auto-corrects pitch and roll in real-time.</p>
        </div>
        <FlightAnimation />
      </section>

      {/* 4. PRODUCT SHOWCASE / PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Choose Your Setup</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">VT-Simple Trainer Lineup</h2>
          </div>
          <div className="animated-border-container w-full sm:w-auto">
            <div className="animated-border-bg"></div>
            <Link
              to="/shop"
              className="px-5 py-2.5 bg-[#1F3A5F] hover:bg-[#11223F] text-white text-xs font-bold uppercase tracking-wider rounded-[10px] flex items-center justify-center gap-1.5 transition-all duration-200 w-full sm:w-auto relative z-10"
            >
              <span>View All Products & Spares</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <div className="animated-border-container w-full sm:w-auto p-[3px] rounded-[18px]">
            <div className="animated-border-bg"></div>
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-[#1F3A5F] hover:bg-[#11223F] text-white text-sm sm:text-base font-extrabold rounded-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 w-full sm:w-auto relative z-10"
            >
              <span>Explore All Products & Spares</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. KEY FEATURES GRID */}
      <section className="bg-slate-100/70 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Engineered For Excellence</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Why Beginners Choose Rc Flight Zone</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">High-Wing Dihedral Physics</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Inherently stable aerodynamic balance restores wing level status automatically when control input ceases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">1-Click Panic Recovery</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                If wind throws you off course, press the Panic switch to level the plane instantly at any speed or angle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Durable EPO Foam Airframe</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                High-density resilient foam absorbs tough grass landings and is 100% glue-repairable on the field.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Folding Prop Protection</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Folding propeller blades protect the motor shaft and ESC during belly landings or unpaved field rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMAGE GALLERY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Visual Gallery</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">VT-Simple Trainer In Action</h2>
          </div>
          <Link
            to="/gallery"
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1F3A5F] flex items-center gap-1 transition"
          >
            <span>Explore Full Photo Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.slice(0, 3).map((item) => (
            <Link 
              key={item.id} 
              to={`/gallery?photo=${item.id}`}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 aspect-4/3 bg-gray-100 shadow-xs block cursor-pointer hover:shadow-lg transition-shadow duration-300 card-hover"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold text-blue-300 uppercase">{item.category}</span>
                <h3 className="font-semibold text-sm">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Video Center</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Flight Demos & Tutorials</h2>
          </div>
          <Link
            to="/videos"
            className="text-xs font-semibold text-[#2563EB] hover:text-[#1F3A5F] flex items-center gap-1 transition"
          >
            <span>Watch All Videos</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videosData.slice(0, 2).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition space-y-0"
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#2563EB]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  {vid.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#2563EB] transition-colors">{vid.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{vid.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-[#1F3A5F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Pilot Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">Trusted By Instructors & Beginners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((test) => (
              <div key={test.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <RatingStars rating={test.rating} />
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{test.quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700/60">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-400/40"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{test.name}</h4>
                    <span className="text-[10px] text-slate-400 block">{test.role} • {test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqsData.slice(0, 4).map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-gray-900 hover:text-[#2563EB] transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    {faq.question}
                  </span>
                  <span className="text-gray-400 font-mono text-lg">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link to="/faq" className="text-xs font-semibold text-[#2563EB] hover:underline">
            View All Frequently Asked Questions →
          </Link>
        </div>

        {/* Contact Queries Callout Banner */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mt-8">
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

      {/* Video Modal Player */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
