import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Check, Star, ArrowRight, Play, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { generateProductSchema } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';

import productsData from '../data/products.json';
import accessoriesData from '../data/accessories.json';
import reviewsData from '../data/reviews.json';
import videosData from '../data/videos.json';

import eppKitContents from '../assets/images/epp_trainer_kit_contents.png';
import trainerSky from '../assets/images/trainer_sky.jpg';
import trainerGround from '../assets/images/trainer_ground.jpg';

export default function ProductDetailsPage() {
  const { id } = useParams();

  const allCatalog = [...productsData, ...accessoriesData];
  const product = allCatalog.find((p) => p.slug === id || p.id === id) || productsData[0];

  const [selectedImage, setSelectedImage] = useState(
    Array.isArray(product.images) ? product.images[0] : (product.image || '/src/assets/images/vt_trainer_hero_1784882888882.jpg')
  );
  const [activeTab, setActiveTab] = useState('description');
  const [kitOption, setKitOption] = useState(null); // 'starter' or 'airframe'
  const [electronicsOption, setElectronicsOption] = useState(null); // 'no-electronics' or 'with-electronics'
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const isAircraft = true;
  const isViggen = product.id === 'vt-viggen';
  const displayName = product.name;
  const displayDesc = product.summary || product.description;

  const powerPackLabel = isViggen ? 'Viggen Power Pack' : 'Trainer Power Pack';
  const basePriceVal = isViggen ? 2499 : 1799;
  const baseOriginalPriceVal = isViggen ? 2599 : 1999;
  const packPriceVal = isViggen ? 5699 : 4699;
  const packOriginalPriceVal = isViggen ? 5799 : 4899;

  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const currentBasePriceStr = formatINR(basePriceVal * quantity);
  const currentBaseOriginalPriceStr = formatINR(baseOriginalPriceVal * quantity);
  const currentPackPriceStr = formatINR(packPriceVal * quantity);
  const currentPackOriginalPriceStr = formatINR(packOriginalPriceVal * quantity);
  const currentPriceRangeStr = `${formatINR(basePriceVal * quantity)} – ${formatINR(packPriceVal * quantity)}`;

  useSEO({
    title: `${displayName} | Rc Flight Zone`,
    description: product.summary || product.description,
    image: selectedImage,
    jsonLd: generateProductSchema(product)
  });

  const productImages = Array.isArray(product.images) ? product.images : [selectedImage];
  const relatedProducts = allCatalog.filter((p) => p.id !== product.id);
  const productReviews = reviewsData.filter((r) => r.productId === product.id || product.id.includes('vt-simple-trainer'));

  const carouselRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let intervalId;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (isHovered) return;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 344, behavior: 'smooth' }); // w-80 (320px) + gap-6 (24px) = 344px
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, relatedProducts.length]);

  const [animateProgress, setAnimateProgress] = useState(false);

  const progressRef = React.useCallback((node) => {
    if (node !== null) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimateProgress(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
    }
  }, []);

  React.useEffect(() => {
    if (activeTab !== 'description') {
      setAnimateProgress(false);
    }
  }, [activeTab]);

  const shopifyUrl = product.shopifyUrl || `https://your-shopify-store.myshopify.com/products/${product.slug || product.id}`;

  return (
    <div className="space-y-12 pb-16">
      <Breadcrumbs
        items={[
          { name: 'Shop', url: '/shop' },
          { name: product.category || 'Aircraft', url: '/shop' },
          { name: displayName, url: `/product/${product.id}` }
        ]}
      />

      {/* Top Product Hero Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image Gallery & Switcher */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="relative rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 aspect-4/3 shadow-sm group cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-[#e05638] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-xs pointer-events-none">
                SALE
              </span>
            )}
            <img
              src={selectedImage}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
              style={{
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center center'
              }}
            />
          </div>

          {/* Thumbnail Strip */}
          {productImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-20 rounded-lg overflow-hidden border flex-shrink-0 transition ${
                    selectedImage === img ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{displayName}</h1>
            
            {/* Top Pricing Display */}
            <div className="text-xl font-bold text-gray-900">
               {isAircraft ? currentPriceRangeStr : `₹${Math.round((product.price || 0) * quantity * 80).toLocaleString('en-IN')}.00`}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-normal">
              {displayDesc}
            </p>

            {/* KIT OPTION selector (specifically for Aircraft category) */}
            {isAircraft && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 tracking-wider">KIT OPTION:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setKitOption('starter');
                          setElectronicsOption(null);
                        }}
                        className={`px-3 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                          kitOption === 'starter'
                            ? 'bg-[#22252a] text-white'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        Starter Kit
                      </button>
                      <button
                        onClick={() => {
                          setKitOption('airframe');
                          setElectronicsOption(null);
                        }}
                        className={`px-3 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                          kitOption === 'airframe'
                            ? 'bg-[#22252a] text-white'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        Airframe Kit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-options for Airframe Kit */}
                {kitOption === 'airframe' && (
                  <div className="flex items-center gap-2 pl-4 border-l-2 border-gray-200 py-1 transition-all duration-200">
                    <span className="text-xs font-bold text-gray-700 tracking-wider">ELECTRONICS:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setElectronicsOption('no-electronics')}
                        className={`px-3 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                          electronicsOption === 'no-electronics'
                            ? 'bg-[#22252a] text-white'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        No Electronics
                      </button>
                      <button
                        onClick={() => setElectronicsOption('with-electronics')}
                        className={`px-3 py-2 text-xs font-semibold uppercase transition-all duration-200 ${
                          electronicsOption === 'with-electronics'
                            ? 'bg-[#22252a] text-white'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        With Electronics
                      </button>
                    </div>
                  </div>
                )}

                {(kitOption || electronicsOption) && (
                  <div>
                    <button
                      onClick={() => {
                        setKitOption(null);
                        setElectronicsOption(null);
                      }}
                      className="text-[10px] text-gray-400 hover:text-gray-900 uppercase font-semibold underline tracking-wider"
                    >
                      Clear Choice
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Starter Kit Details */}
            {isAircraft && kitOption === 'starter' && (
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <p className="font-bold text-[#e03a3a] text-xs sm:text-sm">Starter Kit Contents (Everything you need to fly):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700 font-medium">
                    <li>High-Strength EPP Airframe Kit (Reinforced with Carbon Fiber)</li>
                    <li>DYS 2826 1400kv Brushless Motor</li>
                    <li>30A Electronic Speed Controller (ESC)</li>
                    <li>3 Nos. TowerPro 9g Metal Gear Servos</li>
                    <li>2.4GHz 6-Channel Radio Transmitter & Receiver</li>
                    <li>11.1V 3S 1300mAh LiPo Battery</li>
                    <li>3S LiPo Balance Charger</li>
                    <li>2x 8x4.7 Propellers</li>
                    <li>Complete hardware pack (pushrods, landing gear, wheels, servo extensions, connectors)</li>
                  </ul>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50 aspect-video flex items-center justify-center p-1">
                    <img src="/src/assets/images/starter_kit_components.jpg" alt="Starter Kit Components" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            )}

            {/* Electronics Package list if Airframe + With Electronics is selected */}
            {isAircraft && kitOption === 'airframe' && electronicsOption === 'with-electronics' && (
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <p className="font-bold text-[#e03a3a] text-xs sm:text-sm">Optional Electronics Pack Contents (Included with "With Electronics" option):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <ul className="list-disc pl-5 space-y-1 text-xs text-gray-700 font-medium">
                    <li>DYS 2826 1400kv Brushless Outrunner Motor</li>
                    <li>30A Electronic Speed Controller</li>
                    <li>3 Nos. TowerPro 9Gm Metal Gear Servos</li>
                    <li>3X 30cm Servo Extension Cable</li>
                    <li>0.5 Meter Red (32 Strands/0.2mm Tinned copper ) Silicone Wire.</li>
                    <li>0.5 Meter Black (32 Strands/0.2mm Tinned copper ) Silicone Wire</li>
                    <li>Propellor: 8×4.7</li>
                    <li>1 Male XT60 Connector</li>
                    <li>4MM Heatshrink Tube Piece Red</li>
                    <li>4MM Heatshrink Tube Piece Black</li>
                  </ul>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50 aspect-video flex items-center justify-center p-1">
                    <img src="/src/assets/images/epp_trainer_electronics.png" alt="Optional electronics package" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            )}

            {/* Selected Price Display below options */}
            <div className="pt-4 border-t border-gray-100">
              {isAircraft ? (
                kitOption ? (
                  kitOption === 'starter' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-gray-400 line-through">{currentPackOriginalPriceStr}</span>
                      <span className="text-2xl font-bold text-gray-900">{currentPackPriceStr}</span>
                    </div>
                  ) : electronicsOption ? (
                    <div className="flex items-baseline gap-2">
                      {electronicsOption === 'no-electronics' ? (
                        <>
                          <span className="text-sm text-gray-400 line-through">{currentBaseOriginalPriceStr}</span>
                          <span className="text-2xl font-bold text-gray-900">{currentBasePriceStr}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-400 line-through">{currentPackOriginalPriceStr}</span>
                          <span className="text-2xl font-bold text-gray-900">{currentPackPriceStr}</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">Please select an electronics option to view the final price.</div>
                  )
                ) : (
                  <div className="text-xs text-gray-400 italic">Please select a Kit Option to view the final price.</div>
                )
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1F3A5F]">₹{Math.round((product.price || 0) * quantity * 80).toLocaleString('en-IN')}.00</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{Math.round((product.originalPrice || 0) * quantity * 80).toLocaleString('en-IN')}.00</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              {/* Quantity Changer */}
              <div className="flex items-center border border-gray-200 h-11 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 font-bold transition"
                >
                  –
                </button>
                <span className="w-12 h-full flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 font-bold transition"
                >
                  +
                </button>
              </div>

              {/* Order Now */}
              <a
                href={shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (isAircraft) {
                    if (!kitOption) {
                      e.preventDefault();
                      alert("Please select a Kit Option (Starter Kit or Airframe Kit) to proceed.");
                    } else if (kitOption === 'airframe' && !electronicsOption) {
                      e.preventDefault();
                      alert("Please select an Electronics option (No Electronics or With Electronics) to proceed.");
                    }
                  }
                }}
                className="flex-1 h-11 px-6 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 text-center select-none bg-[#22252a] text-white hover:bg-black active:scale-95"
              >
                <span>Order Now</span>
              </a>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:support@rcflightzone.com" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* Detailed Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          
          {/* Tab Navigation Buttons */}
          <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto scrollbar-none">
            {[
              { id: 'description', label: 'Description' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'warranty', label: '1-Year Warranty' },
              { id: 'reviews', label: `Reviews (${productReviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#2563EB] text-[#2563EB] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
            
            {activeTab === 'description' && (
              <div className="space-y-10">
                {/* Description Header */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#dd3333]">{displayName}</h3>
                  <p className="text-gray-700 text-sm font-medium leading-relaxed">{displayDesc}</p>
                  <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <img 
                      src="/src/assets/images/super_trainer_banner.png" 
                      alt="Super Trainer EPP Banner" 
                      className="w-full h-auto object-cover max-h-[400px]"
                    />
                  </div>
                </div>

                {/* Specs and Recommended Equipment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Specifications */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 space-y-4">
                    <h4 className="text-center font-bold text-[#dd3333] text-base uppercase tracking-wider border-b pb-2">Specifications</h4>
                    <ul className="space-y-3 text-xs sm:text-sm font-medium text-gray-700">
                      <li className="flex justify-between border-b pb-1">
                        <span>Wingspan:</span>
                        <span className="font-bold text-gray-900">1200 mm</span>
                      </li>
                      <li className="flex justify-between border-b pb-1">
                        <span>All-Up-Weight:</span>
                        <span className="font-bold text-gray-900">~500 g</span>
                      </li>
                      <li className="flex justify-between pb-1">
                        <span>CG Location:</span>
                        <span className="font-bold text-gray-900">60 mm from Leading Edge (at Spar)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column: Recommended Equipment */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 space-y-4">
                    <h4 className="text-center font-bold text-[#dd3333] text-base uppercase tracking-wider border-b pb-2">Recommended Equipment</h4>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>4-6 Channel Programmable Radio (Tx-Rx)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>800-1500 mAh 2S/3S LiPo Battery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>20-30 Amp Brushless ESC</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>2 Nos. 9g Servos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>Brushless Motor 22XX or 28XX series</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#dd3333]">•</span>
                        <span>6-9 inch Propeller</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* What's Included Card */}
                <div className="bg-white rounded-2xl border-t-4 border-t-[#d48a37] border border-gray-200 p-6 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 border-b pb-3">
                    <svg className="w-6 h-6 text-[#d48a37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h4 className="font-extrabold text-[#dd3333] text-base uppercase tracking-wider">Whats Included In The Kit</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="space-y-2">
                      <p>• EPP Fuselage Middle Section</p>
                      <p>• 2x EPP Printed Side Walls</p>
                      <p>• EPP Printed Horizontal & Vertical Stabilizer</p>
                      <p>• 2x 600mm EPP Wing Panels</p>
                      <p>• 2MM Laser Cut Aeroply sheet</p>
                      <p>• 3MM Laser Cut Aeroply sheet</p>
                    </div>
                    <div className="space-y-2">
                      <p>• 2X 600mm 5*1MM Carbon Fiber Strip</p>
                      <p>• Pushrods 2x 600mm each</p>
                      <p>• 2 Nos Linkage Connectors</p>
                      <p>• Velcro</p>
                      <p>• 5x Pushrod Guides</p>
                      <p>• 3x Bamboo Skewers</p>
                    </div>
                    <div className="space-y-2">
                      <p>• 10x Rubber Bands</p>
                      <p>• Landing Gear Set</p>
                      <p>• 2x EPP Wheels</p>
                      <p>• 50MM 5″ Heatshrink Tube</p>
                      <p>• 17″ Landing Gear Wire</p>
                      <p>• 4X Wheel Collars</p>
                    </div>
                  </div>
                  
                  {/* Kit content images */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                      <img src="/src/assets/images/epp_trainer_kit_contents.png" alt="Kit Foam parts" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                      <img src="/src/assets/images/epp_trainer_wooden_parts.png" alt="Kit wooden parts" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                      <img src={productImages[0]} alt="Assembled Wing panel" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Kit Options - Electronics */}
                <div className="bg-[#fcfcfc] rounded-2xl border border-gray-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="font-extrabold text-[#dd3333] text-base uppercase tracking-wider border-b pb-2">Kit Options - Electronics</h4>
                    <p className="font-bold text-gray-800 text-sm">Optional Electronics Pack Includes :</p>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-700 pl-4 list-disc">
                      <li>2 Nos. 9 gm Servos</li>
                      <li>1 Nos. 30Amp Brushless ESC (Speed controller)</li>
                      <li>1 Nos. DYS CF2822 1200Kv Brushless Motor</li>
                      <li>1 Nos. 9×4.7 Propellor</li>
                      <li>3 Nos. Male Bullet Connectors ( For Motor Leads )</li>
                      <li>Heatshrink Tube Piece 4MM Red</li>
                      <li>Heatshrink Tube Piece 4MM Black</li>
                    </ul>
                  </div>
                  <div className="md:col-span-5 rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-4/3 bg-gray-50">
                    <img src="/src/assets/images/epp_trainer_electronics.png" alt="Optional electronics package" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Build, Flying Levels & Expert Advice */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Progress bars */}
                  <div ref={progressRef} className="md:col-span-7 space-y-5">
                    {/* Build Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>Build Level - EASY</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? '85%' : '0%', 
                            transition: 'width 1.2s ease-out' 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Flying Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>Flying Level - EASY</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? '90%' : '0%', 
                            transition: 'width 1.2s ease-out 0.2s' 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Cost Effective */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>Cost Effective - ULTRA ECONOMICAL</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? '95%' : '0%', 
                            transition: 'width 1.2s ease-out 0.4s' 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Expert Advice Box */}
                  <div className="md:col-span-5 bg-red-50/50 border border-red-100 rounded-2xl p-5 shadow-xs flex gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#dd3333] flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-[#dd3333] text-sm uppercase tracking-wider">Expert Advice</h4>
                      <p className="text-gray-700 text-xs sm:text-sm italic font-medium leading-relaxed">
                        "The VT-Simple Trainer is exceptionally easy to build, and fly. Ideal for the first time Builder and flier."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Packaging & Shipping Section */}
                <div className="pt-8 border-t border-gray-200 space-y-6">
                  <h4 className="font-extrabold text-[#dd3333] text-base uppercase tracking-wider">PACKAGING & SHIPPNG</h4>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">
                    All our kits are securely packaged to ensure they reach you safely. Lasercut Sheets are first shrink wrapped, small parts are sealed in plastic bags, and then the entire kit is bubble wrapped, before being put in a custom made 5-ply corrugated Box.
                  </p>
                  
                  {/* Three side by side packaging images */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div className="space-y-2 text-center">
                      <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                        <img src="/src/assets/images/packaging_shrink_wrapped.png" alt="Shrink Wrapped" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold block">Shrink Wrapped for Protection</span>
                    </div>

                    <div className="space-y-2 text-center">
                      <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                        <img src="/src/assets/images/packaging_bubble_wrapped.png" alt="Bubble Wrapped" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold block">Bubble Wrapped for Further Protection</span>
                    </div>

                    <div className="space-y-2 text-center">
                      <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video shadow-xs bg-gray-50">
                        <img src="/src/assets/images/packaging_corrugated_box.png" alt="Corrugated box" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-500 font-semibold block">Shipped in Strong Corrugated box</span>
                    </div>
                  </div>

                  {/* India Post details */}
                  <div className="flex flex-col md:flex-row gap-6 pt-4 items-center justify-between border-t border-gray-100">
                    <div className="space-y-3 flex-1">
                      <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">
                        All Kits are shipped via India Post. This is because, Private couriers charge based on Volumetric Pricing, which is often very expensive. We stand by our kits and guarantee that in case of any major damages during transit, or any manufacturing defects , we shall gladly help arrange replacements.
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">
                        IndiaPost Service is a Trackable service, and we provide tracking details, usually within 1 working day.
                      </p>
                    </div>

                    {/* India Post Logo block */}
                    <div className="flex flex-col items-center border border-gray-200 rounded-xl p-3 bg-white w-40 flex-shrink-0">
                      <div className="text-[10px] font-bold text-gray-800 leading-tight">भारतीय डाक</div>
                      <div className="w-24 h-12 bg-[#D12B2B] relative rounded-md overflow-hidden my-1 flex items-center justify-center">
                        <svg className="w-16 h-10 text-[#FFCC00]" fill="currentColor" viewBox="0 0 100 50">
                          <polygon points="10,40 50,10 90,40 55,30" />
                          <line x1="10" y1="40" x2="90" y2="40" stroke="#FFCC00" strokeWidth="4" />
                        </svg>
                      </div>
                      <div className="text-xs font-extrabold text-[#D12B2B] tracking-wider leading-none">India Post</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">Shipping & Delivery Guidelines</h3>
                <p>We pack every aircraft inside dual-wall reinforced high-density corrugated flight boxes to ensure your VT-Simple Trainer arrives in pristine condition.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-gray-900 text-xs uppercase mb-1">Standard Shipping</h4>
                    <p className="text-xs text-gray-500">3-5 Business Days (₹1,200 or FREE on orders &gt; ₹12,000)</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-gray-900 text-xs uppercase mb-1">Express Priority Air</h4>
                    <p className="text-xs text-gray-500">1-2 Business Days (₹2,400.00)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900">1-Year Factory Limited Warranty</h3>
                <p>Every Rc Flight Zone product is covered against manufacturer defects in electronics, servos, brushless motor, ESC, and radio transmitter for 12 months from delivery.</p>
                <p>In addition, our <strong>Lifetime Flight Support</strong> grants you free telephone or chat consultation with master RC technicians to troubleshoot setup or repairs.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">Customer Ratings & Reviews</h3>
                  <Link to="/reviews" className="text-xs font-semibold text-[#2563EB] hover:underline">
                    Write a Review
                  </Link>
                </div>

                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-xs">{rev.author}</span>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>
                      <RatingStars rating={rev.rating} />
                      <h4 className="font-semibold text-xs text-gray-900">{rev.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Build & Assembly Video Section */}
      {product.category === 'Aircraft' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
          <div className="border-t border-gray-200 pt-10">
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                Step-by-Step Assembly
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                How to Build & Assemble
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Follow our master builder's video guide to assemble the {product.name} airframe step-by-step in under 10 minutes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-gray-150 rounded-3xl p-6 lg:p-8 shadow-md">
              {/* Left Column: Premium Video Container */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-100 shadow-sm aspect-video group">
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster="/src/assets/images/vt_trainer_studio_1784882902062.jpg"
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Right Column: Build Chapters / Timestamps */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#2563EB] rounded-full"></span>
                    Assembly Chapters
                  </h3>
                  
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900">Unboxing & Inventory</h4>
                        <p className="text-[11px] text-gray-500">Checking laser-cut EPP sheets and structural hardware (0:00 - 2:15)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900">Fuselage & Wing Joinery</h4>
                        <p className="text-[11px] text-gray-500">Inserting carbon spars and locking the main wing panels (2:15 - 5:45)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-gray-900">Servos & Pushrods Linkage</h4>
                        <p className="text-[11px] text-gray-500">Routing servo extensions and connecting control horn pushrods (5:45 - 8:30)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    <strong>Need additional help?</strong> Download the full PDF instruction guide from the support page or connect with our pilot hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Bought Together</h2>
        <div className="relative group/carousel">
          {/* Scrollable Container */}
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="flex-shrink-0 w-80 snap-start">
                <ProductCard product={rel} />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: -344, behavior: 'smooth' });
              }
            }}
            className="absolute -left-4 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
            aria-label="Scroll left"
          >
            <span className="text-2xl font-bold leading-none select-none">‹</span>
          </button>
          <button
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 344, behavior: 'smooth' });
              }
            }}
            className="absolute -right-4 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
            aria-label="Scroll right"
          >
            <span className="text-2xl font-bold leading-none select-none">›</span>
          </button>
        </div>
      </section>
    </div>
  );
}
