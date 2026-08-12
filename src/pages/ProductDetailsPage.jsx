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
import rcFlightZoneBanner from '../assets/images/rc_flight_zone_banner.png';

const ImagePlaceholder = ({ label, src, onClick, aspect = 'aspect-[4/3]' }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl ${aspect} text-center group hover:border-[#dd3333] transition-colors duration-250`}>
        <svg className="w-8 h-8 text-gray-300 group-hover:text-[#dd3333] mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Photo Placeholder</span>
        <span className="text-[11px] text-gray-700 font-extrabold mt-1 uppercase tracking-wide px-2">{label}</span>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="flex flex-col rounded-xl overflow-hidden border border-gray-200 shadow-xs bg-white group hover:border-[#dd3333] hover:shadow-md cursor-pointer transition-all duration-250"
    >
      <div className={`${aspect} overflow-hidden bg-gray-50 flex items-center justify-center p-2`}>
        <img 
          src={src} 
          alt={label} 
          onError={() => setError(true)} 
          className="max-w-full max-h-full object-contain group-hover:scale-102 transition-transform duration-300"
        />
      </div>
      <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
};

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
  const [lightbox, setLightbox] = useState(null); // { src, label }

  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const isAircraft = true;
  const isViggen = product.id === 'vt-viggen' || product.id === 'vt-simple-trainer-pnp' || product.name.toLowerCase().includes('viggen') || product.name.toLowerCase().includes('vission');
  const isMustang = product.id === 'vt-lipo-battery-3s' || product.name.toLowerCase().includes('mustang');
  const isSpitfire = product.id === 'vt-6x-transmitter' || product.name.toLowerCase().includes('spitfire');
  const isGuineaPig = product.id === 'vt-guinea-pig' || product.name.toLowerCase().includes('guinea');
  const isStorch = product.id === 'vt-storch' || product.name.toLowerCase().includes('storch');
  const isExplorer = product.id === 'vt-explorer' || product.name.toLowerCase().includes('explorer');
  const isSpear = product.id === 'vt-spear' || product.name.toLowerCase().includes('spear');
  const isRaptor = product.id === 'vt-raptor' || product.name.toLowerCase().includes('raptor');
  const isOldFogey = product.id === 'vt-old-fogey' || product.name.toLowerCase().includes('fogey');
  const isBaron = product.id === 'vt-bloody-baron' || product.name.toLowerCase().includes('baron');
  const displayName = product.name;
  const displayDesc = product.summary || product.description;

  const powerPackLabel = isViggen ? 'Viggen Power Pack' : 'Trainer Power Pack';
  const basePriceVal = isViggen ? 2149 : (isMustang ? 2099 : (isSpitfire ? 1749 : (isGuineaPig ? 2599 : (isStorch ? 2599 : (isExplorer ? 2599 : (isSpear ? 1999 : (isRaptor ? 1499 : (isOldFogey ? 1599 : (isBaron ? 1749 : 1399)))))))));
  const baseOriginalPriceVal = isViggen ? 2649 : (isMustang ? 2599 : (isSpitfire ? 2149 : (isGuineaPig ? 2999 : (isStorch ? 2999 : (isExplorer ? 2999 : (isSpear ? 2499 : (isRaptor ? 1899 : (isOldFogey ? 1999 : (isBaron ? 2149 : 1749)))))))));
  const packPriceVal = isViggen ? 4999 : (isMustang ? 4199 : (isSpitfire ? 3999 : (isGuineaPig ? 8999 : (isStorch ? 5555 : (isExplorer ? 4999 : (isSpear ? 3999 : (isRaptor ? 3999 : (isOldFogey ? 3599 : (isBaron ? 3599 : 2999)))))))));
  const packOriginalPriceVal = isViggen ? 5499 : (isMustang ? 4699 : (isSpitfire ? 4499 : (isGuineaPig ? 9499 : (isStorch ? 5999 : (isExplorer ? 5499 : (isSpear ? 4499 : (isRaptor ? 4499 : (isOldFogey ? 3999 : (isBaron ? 3999 : 3499)))))))));

  const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const currentBasePriceStr = formatINR(basePriceVal * quantity);
  const currentBaseOriginalPriceStr = formatINR(baseOriginalPriceVal * quantity);
  const currentPackPriceStr = formatINR(packPriceVal * quantity);
  const currentPackOriginalPriceStr = formatINR(packOriginalPriceVal * quantity);
  const currentPriceRangeStr = `${formatINR(basePriceVal * quantity)} – ${formatINR(packPriceVal * quantity)}`;

  useSEO({
    title: `${displayName} | Rc Plane Zone`,
    description: product.summary || product.description,
    image: selectedImage,
    jsonLd: generateProductSchema(product)
  });

  const productImages = Array.isArray(product.images) ? product.images : [selectedImage];
  const relatedProducts = allCatalog.filter(
    (p) => p.id !== product.id && p.id !== 'vt-trainer-spare-wing' && p.id !== 'vt-flight-sim-dongle'
  );
  const productReviews = reviewsData.filter((r) => r.productId === product.id || product.id.includes('vt-simple-trainer'));

  const carouselRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = React.useRef(null);

  const handleInteractionStart = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000); // Resume auto scroll after 4 seconds of inactivity
  };

  React.useEffect(() => {
    if (product) {
      setSelectedImage(Array.isArray(product.images) ? product.images[0] : (product.image || '/src/assets/images/vt_trainer_hero_1784882888882.jpg'));
      setKitOption(null);
      setElectronicsOption(null);
      setQuantity(1);
      setIsAdded(false);
      setLightbox(null);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  React.useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const [isCarouselInView, setIsCarouselInView] = useState(false);

  React.useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const container = carouselRef.current;
    if (!container || !isCarouselInView) return;

    let intervalId;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (isHovered || isUserInteracting) return;
        
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 344, behavior: 'smooth' }); // w-80 (320px) + gap-6 (24px) = 344px
        }
      }, window.innerWidth < 768 ? 2000 : 1000); // Autoscroll every 2 seconds on mobile, 1 second on desktop
    };

    startAutoScroll();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, isCarouselInView, isUserInteracting, relatedProducts.length]);

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
                  className={`relative w-24 h-20 rounded-lg overflow-hidden border flex-shrink-0 transition bg-white ${
                    selectedImage === img ? 'border-gray-900 ring-1 ring-gray-900' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{displayName}</h1>
            
            <div className="flex items-baseline gap-3">
               {isAircraft ? (
                 <>
                   <span className="text-3xl font-extrabold text-gray-900">{currentBasePriceStr}</span>
                   <span className="text-sm text-gray-400 line-through font-normal">{currentBaseOriginalPriceStr}</span>
                 </>
               ) : (
                 <>
                   <span className="text-3xl font-extrabold text-[#1F3A5F]">₹{Math.round((product.price || 0) * quantity * 80).toLocaleString('en-IN')}.00</span>
                   {product.originalPrice && (
                     <span className="text-sm text-gray-400 line-through font-normal">₹{Math.round((product.originalPrice || 0) * quantity * 80).toLocaleString('en-IN')}.00</span>
                   )}
                 </>
               )}
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-gray-400 line-through">{currentPackOriginalPriceStr}</span>
                          <span className="text-2xl font-bold text-gray-900">{currentPackPriceStr}</span>
                          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-sm uppercase tracking-wider">Out of Stock</span>
                        </div>
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
              {isAircraft && kitOption === 'airframe' && electronicsOption === 'with-electronics' ? (
                <button
                  disabled
                  className="flex-1 h-11 px-6 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center select-none bg-gray-400 text-white cursor-not-allowed"
                >
                  <span>Out of Stock</span>
                </button>
              ) : (
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
              )}
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
                      src={rcFlightZoneBanner} 
                      alt="Rc Plane Zone Banner" 
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
                      {isViggen ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">25.5 inches (700mm)</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without battery:</span>
                            <span className="font-bold text-gray-900">600gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">5.25in/133mm from Leading edge of rudder</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 90 – 120 EXPO: 400</span>
                          </li>
                        </>
                      ) : isMustang ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">1020mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">750gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">550gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">815mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">2.75in/70mm from the leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 160 EXPO: 300</span>
                          </li>
                        </>
                      ) : isSpitfire ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">1085mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">700gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">500gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">845mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">2.75in/68mm from the leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 100 EXPO: 300</span>
                          </li>
                        </>
                      ) : isGuineaPig ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">58in/1473mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">1750gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">1400gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">48in/1220mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">50mm from the leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 160 EXPO: 300</span>
                          </li>
                        </>
                      ) : isStorch ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">1462mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">1000 gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">800gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">965mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">2in/50mm from the leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 160 Expo: 300</span>
                          </li>
                        </>
                      ) : isExplorer ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">57in/1448mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">850 gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">650gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">36.5in/927mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wing Area:</span>
                            <span className="font-bold text-gray-900">460 in² / 29.7 dm²</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">2.25in/57mm from leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wing Loading (WL):</span>
                            <span className="font-bold text-gray-900">7.54 oz./ft² / 23 g/dm²</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Aileron: 12°, Elevator: 12°, Rudder: 12°</span>
                          </li>
                        </>
                      ) : isSpear ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">41 inches (1041mm)</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">850 gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">600gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">20in/500mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">76-89mm in front of firewall</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 160 EXPO: 300</span>
                          </li>
                        </>
                      ) : isRaptor ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">25.5in/650mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">450gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">350gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">35in/890mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">400mm from the nose</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 200 – 400 EXPO: 300</span>
                          </li>
                        </>
                      ) : isOldFogey ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">1410mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">550gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">425gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">775mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">76-89mm from the leading edge of the wing</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Elevons: 120 EXPO: 300</span>
                          </li>
                        </>
                      ) : isBaron ? (
                        <>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wingspan:</span>
                            <span className="font-bold text-gray-900">29.25in/762mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>AUW:</span>
                            <span className="font-bold text-gray-900">550gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Weight Without Battery:</span>
                            <span className="font-bold text-gray-900">420gms</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Length:</span>
                            <span className="font-bold text-gray-900">24in/610mm</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wing Area:</span>
                            <span className="font-bold text-gray-900">243.89 in² / 15.7 dm²</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>CG Location:</span>
                            <span className="font-bold text-gray-900">2.3in/58.7mm from leading edge of wing</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wing Loading (WL):</span>
                            <span className="font-bold text-gray-900">10.06 oz./ft² / 32.5 g/dm²</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span>Wing Cube Loading (WCL):</span>
                            <span className="font-bold text-gray-900">8.2</span>
                          </li>
                          <li className="flex justify-between pb-1">
                            <span>Control Throws:</span>
                            <span className="font-bold text-gray-900">Aileron: 20° Expo: 300, Elevator: 20° Expo: 300, Rudder: 20° Expo: 300</span>
                          </li>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Right Column: Recommended Equipment */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-150 space-y-4">
                    <h4 className="text-center font-bold text-[#dd3333] text-base uppercase tracking-wider border-b pb-2">Recommended Equipment</h4>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-700">
                      {isViggen ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>EDF: 1000-1200 Watts. Minimum thrust 1100gms.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 75-90Amps</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: 2300kv-2800kv Motor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 40-60 amps</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 2200-3300 mAH 4s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (2) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>For Thrust Vectoring Use Metal gear servos.</span>
                          </li>
                        </>
                      ) : isMustang ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>MOTOR: Min Thrust 700gms.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 20-30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>BATTERY: 1000-2200 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>SERVOS: (4) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>PROP: 8×4.5-9×4.7</span>
                          </li>
                        </>
                      ) : isSpitfire ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: Min Thrust 810gms.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 18-30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 1800-2200 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (4) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×6-9×4.7</span>
                          </li>
                        </>
                      ) : isGuineaPig ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: Min 900gm Thrust</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 18-30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 2200-5000 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (4-5) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×4.5 – 10×5</span>
                          </li>
                        </>
                      ) : isStorch ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: Min Thrust 900gms.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 2200 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (4-6) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×4.5-10×4.7</span>
                          </li>
                        </>
                      ) : isExplorer ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: 2826 1400kv 200Wmin.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 2200 mAH 3s (min)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: 9 gram X2 Trainer / X4 Sport</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8 X 5 / 9 X 6</span>
                          </li>
                        </>
                      ) : isSpear ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: 1400kv Motor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 2200-3300 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (2) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×4.7 / 9 X 4.7 Pusher</span>
                          </li>
                        </>
                      ) : isRaptor ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: 1400kv Motor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 20-30 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 1000- 1300 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (2) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×4.7 / 9 X 4.7</span>
                          </li>
                        </>
                      ) : isOldFogey ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: 1200kv Motor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 20 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 500-1000 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: (2) 9 gram servos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×4.5 – 9×4.7</span>
                          </li>
                        </>
                      ) : isBaron ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Motor: FC 2822-1200KV</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>ESC: 20 amp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Battery: 1000 mAH 3s</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Servos: 9 gram X 2 (X 3 with Rudder)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#dd3333]">•</span>
                            <span>Prop: 8×6 – 9×6</span>
                          </li>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
                  
                  {isViggen ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro (4 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Thrust Vectoring Mount</p>
                          <p>• FT-Elements Firewall</p>
                          <p>• Control Horns (2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrods (4pcs) 10cmx2, 40cmx2</p>
                          <p>• Pushrod Connectors (2)</p>
                          <p>• Velcro</p>
                          <p>• Wire Set for Thrust Vectoring (3Pcs)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrod Guide Tube (2)</p>
                          <p>• Posterboard Exhaust Tube</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        <ImagePlaceholder label="Laser Cut Fliteboard Pro Right Wing (Sheet A)" src="/src/assets/images/viggen_sheet_a.jpg" onClick={() => setLightbox({ src: "/src/assets/images/viggen_sheet_a.jpg", label: "Laser Cut Fliteboard Pro Right Wing (Sheet A)" })} />
                        <ImagePlaceholder label="Laser Cut Fliteboard Pro Left Wing (Sheet B)" src="/src/assets/images/viggen_sheet_b.jpg" onClick={() => setLightbox({ src: "/src/assets/images/viggen_sheet_b.jpg", label: "Laser Cut Fliteboard Pro Left Wing (Sheet B)" })} />
                        <ImagePlaceholder label="Laser Cut Fliteboard Pro Sheet C (Fuselage Top / Canopy)" src="/src/assets/images/viggen_sheet_c_1.png" onClick={() => setLightbox({ src: "/src/assets/images/viggen_sheet_c_1.png", label: "Laser Cut Fliteboard Pro Sheet C (Fuselage Top / Canopy)" })} />
                        <ImagePlaceholder label="Laser Cut Fliteboard Pro Sheet C (Nose Module / Battery Box)" src="/src/assets/images/viggen_sheet_c_2.png" onClick={() => setLightbox({ src: "/src/assets/images/viggen_sheet_c_2.png", label: "Laser Cut Fliteboard Pro Sheet C (Nose Module / Battery Box)" })} />
                        <ImagePlaceholder label="Laser Cut Fliteboard Pro Sheet D (Motor Mount Backplate)" src="/src/assets/images/viggen_sheet_d.png" onClick={() => setLightbox({ src: "/src/assets/images/viggen_sheet_d.png", label: "Laser Cut Fliteboard Pro Sheet D (Motor Mount Backplate)" })} />
                        <ImagePlaceholder label="Posterboard Exhaust Tube (Curved Template)" src="/src/assets/images/viggen_exhaust_template.jpg" onClick={() => setLightbox({ src: "/src/assets/images/viggen_exhaust_template.jpg", label: "Posterboard Exhaust Tube (Curved Template)" })} />
                        <ImagePlaceholder label="Thrust Vectoring Mount & Hardware Kit" src="/src/assets/images/viggen_accessories.jpg" onClick={() => setLightbox({ src: "/src/assets/images/viggen_accessories.jpg", label: "Thrust Vectoring Mount & Hardware Kit" })} />
                      </div>
                    </>
                  ) : isMustang ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro (4 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (4)</p>
                          <p>• Landing Gear Strip (2)</p>
                          <p>• Pushrods (4pcs) (10cmx2, 20cmx2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrod Connectors (4)</p>
                          <p>• Landing Gear Wire 2Pcs (20cm x2)</p>
                          <p>• Wheels (2Pcs)</p>
                          <p>• Wheel Collars (4)</p>
                          <p>• Bamboo Skewers (3 Short)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Posterboard Turtle Deck</p>
                          <p>• Back Posterboard Canopy</p>
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Datasheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                        <ImagePlaceholder label="P-51D Mustang Sheet A (Right Wing / Vertical Fin)" src="/src/assets/images/mustang_sheet_a.jpg" onClick={() => setLightbox({ src: "/src/assets/images/mustang_sheet_a.jpg", label: "P-51D Mustang Sheet A (Right Wing / Vertical Fin)" })} />
                        <ImagePlaceholder label="P-51D Mustang Sheet B (Left Wing / Horizontal Stab)" src="/src/assets/images/mustang_sheet_b.jpg" onClick={() => setLightbox({ src: "/src/assets/images/mustang_sheet_b.jpg", label: "P-51D Mustang Sheet B (Left Wing / Horizontal Stab)" })} />
                        <ImagePlaceholder label="P-51D Mustang Sheet C (Fuselage / Turtle Deck)" src="/src/assets/images/mustang_sheet_c.png" onClick={() => setLightbox({ src: "/src/assets/images/mustang_sheet_c.png", label: "P-51D Mustang Sheet C (Fuselage / Turtle Deck)" })} />
                        <ImagePlaceholder label="P-51D Mustang Sheet D (Power Pod)" src="/src/assets/images/mustang_sheet_d.png" onClick={() => setLightbox({ src: "/src/assets/images/mustang_sheet_d.png", label: "P-51D Mustang Sheet D (Power Pod)" })} />
                      </div>
                    </>
                  ) : isSpitfire ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro (3 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Simple Motor Mount</p>
                          <p>• Control Horns (4)</p>
                          <p>• Pushrods (4pcs)(40cmx2 , 10cmx2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrod Connectors(4)</p>
                          <p>• Rubber Bands (4)</p>
                          <p>• Bamboo Skewers (3 Short)</p>
                          <p>• ABS/Posterboard parts (2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                        <ImagePlaceholder label="Spitfire Sheet A (Left Wing / Power Pod)" src="/src/assets/images/spitfire_sheet_a.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spitfire_sheet_a.jpg", label: "Spitfire Sheet A (Left Wing / Power Pod)" })} />
                        <ImagePlaceholder label="Spitfire Sheet B (Right Wing / Tail Fin)" src="/src/assets/images/spitfire_sheet_b.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spitfire_sheet_b.jpg", label: "Spitfire Sheet B (Right Wing / Tail Fin)" })} />
                        <ImagePlaceholder label="Spitfire Sheet C (Fuselage)" src="/src/assets/images/spitfire_sheet_c.png" onClick={() => setLightbox({ src: "/src/assets/images/spitfire_sheet_c.png", label: "Spitfire Sheet C (Fuselage)" })} />
                        <ImagePlaceholder label="Spitfire Curved Nose & Exhaust Templates" src="/src/assets/images/spitfire_ex_temp.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spitfire_ex_temp.jpg", label: "Spitfire Curved Nose & Exhaust Templates" })} />
                        <ImagePlaceholder label="Spitfire Hardware Accessories Pack" src="/src/assets/images/spitfire_acc.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spitfire_acc.jpg", label: "Spitfire Hardware Accessories Pack" })} />
                      </div>
                    </>
                  ) : isGuineaPig ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro</p>
                          <p>• Laser Cut Fliteboard Pro Sheets (7 Nos)</p>
                          <p>• Aeroply</p>
                          <p>• Motor Mounts x2</p>
                          <p>• Control Horns (4)</p>
                          <p>• Landing Gear Wire (20cmx2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• MDF Parts</p>
                          <p>• Spar Reinforcement x2</p>
                          <p>• Nose LG Reinforcement x2</p>
                          <p>• Battery Tray</p>
                          <p>• Pushrods (4pcs)(15cmx2,10cmx2)</p>
                          <p>• Pushrod Connectors(4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Bamboo Stick (6 long + 3 Short)</p>
                          <p>• Paper knife</p>
                          <p>• Battery Strap x2</p>
                          <p>• Rubber Bands (4)</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                        <ImagePlaceholder label="Guinea Pig Sheet A" src="/src/assets/images/guinea_pig_sheet_a.jpg" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_a.jpg", label: "Guinea Pig Sheet A" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet B" src="/src/assets/images/guinea_pig_sheet_b.jpg" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_b.jpg", label: "Guinea Pig Sheet B" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet C" src="/src/assets/images/guinea_pig_sheet_c.png" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_c.png", label: "Guinea Pig Sheet C" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet D" src="/src/assets/images/guinea_pig_sheet_d.jpg" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_d.jpg", label: "Guinea Pig Sheet D" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet E" src="/src/assets/images/guinea_pig_sheet_e.png" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_e.png", label: "Guinea Pig Sheet E" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet F" src="/src/assets/images/guinea_pig_sheet_f.png" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_f.png", label: "Guinea Pig Sheet F" })} />
                        <ImagePlaceholder label="Guinea Pig Sheet G" src="/src/assets/images/guinea_pig_sheet_g.jpg" onClick={() => setLightbox({ src: "/src/assets/images/guinea_pig_sheet_g.jpg", label: "Guinea Pig Sheet G" })} />
                      </div>
                    </>
                  ) : isStorch ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Laser Cut Fliteboard Pro Sheets (6 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (4)</p>
                          <p>• Horizontal Tail reinforcement</p>
                          <p>• Wing Spar (2Pcs)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Landing Gear reinforcement (3Pcs)</p>
                          <p>• Pushrods (4pcs)(15cmx3, 25cmx1)</p>
                          <p>• Pushrod Connectors (4)</p>
                          <p>• Landing Gear Wire 4Pcs (37cmx4)</p>
                          <p>• EPP Foam Wheel Set (2Pcs)</p>
                          <p>• Wheel Collars (4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Rubber Bands (4)</p>
                          <p>• Bamboo Skewers (2 Long + 3 Short)</p>
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        <ImagePlaceholder label="FT-Storch Sheet A (Slats / Dihedral Gauge)" src="/src/assets/images/storch_sheet_a.jpg" onClick={() => setLightbox({ src: "/src/assets/images/storch_sheet_a.jpg", label: "FT-Storch Sheet A (Slats / Dihedral Gauge)" })} />
                        <ImagePlaceholder label="FT-Storch Sheet B (Tail Stabilizers / Power Pod)" src="/src/assets/images/storch_sheet_b.jpg" onClick={() => setLightbox({ src: "/src/assets/images/storch_sheet_b.jpg", label: "FT-Storch Sheet B (Tail Stabilizers / Power Pod)" })} />
                        <ImagePlaceholder label="FT-Storch Wing Sheet" src="/src/assets/images/storch_sheet_wing.jpg" onClick={() => setLightbox({ src: "/src/assets/images/storch_sheet_wing.jpg", label: "FT-Storch Wing Sheet" })} />
                        <ImagePlaceholder label="FT-Storch Fuselage Sheet A" src="/src/assets/images/storch_sheet_fuselage.jpg" onClick={() => setLightbox({ src: "/src/assets/images/storch_sheet_fuselage.jpg", label: "FT-Storch Fuselage Sheet A" })} />
                        <ImagePlaceholder label="FT-Storch Fuselage Sheet B" src="/src/assets/images/storch_sheet_c.jpg" onClick={() => setLightbox({ src: "/src/assets/images/storch_sheet_c.jpg", label: "FT-Storch Fuselage Sheet B" })} />
                        <ImagePlaceholder label="FT-Storch Accessories & Hardware Pack" src="/src/assets/images/storch_accessories.png" onClick={() => setLightbox({ src: "/src/assets/images/storch_accessories.png", label: "FT-Storch Accessories & Hardware Pack" })} />
                      </div>
                    </>
                  ) : isExplorer ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Laser-cut foam sheets ( 9 Sheets)</p>
                          <p>• MDF Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrods (4pcs) 75cm, 65cm, 16cmx2</p>
                          <p>• Rubber Bands (4Pcs)</p>
                          <p>• Battery Strap</p>
                          <p>• Bamboo Skewers (3 long)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrod guides (3)</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        <ImagePlaceholder label="FT-Explorer Sheets A & B (Fuselage / Power Pod)" src="/src/assets/images/explorer_sheet_ab.jpg" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_ab.jpg", label: "FT-Explorer Sheets A & B (Fuselage / Power Pod)" })} />
                        <ImagePlaceholder label="FT-Explorer Sheet D (Tail / Stabilizers)" src="/src/assets/images/explorer_sheet_d.jpg" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_d.jpg", label: "FT-Explorer Sheet D (Tail / Stabilizers)" })} />
                        <ImagePlaceholder label="FT-Explorer Wing Spar Sheet" src="/src/assets/images/explorer_sheet_wing_spar.png" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_wing_spar.png", label: "FT-Explorer Wing Spar Sheet" })} />
                        <ImagePlaceholder label="FT-Explorer Wing Sheet (Left Panel)" src="/src/assets/images/explorer_sheet_wing_left.png" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_wing_left.png", label: "FT-Explorer Wing Sheet (Left Panel)" })} />
                        <ImagePlaceholder label="FT-Explorer Wing Sheet (Right Panel)" src="/src/assets/images/explorer_sheet_wing_right.png" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_wing_right.png", label: "FT-Explorer Wing Sheet (Right Panel)" })} />
                        <ImagePlaceholder label="FT-Explorer Wing Sheet (Left Panel Alt)" src="/src/assets/images/explorer_sheet_wing_left_alt.png" onClick={() => setLightbox({ src: "/src/assets/images/explorer_sheet_wing_left_alt.png", label: "FT-Explorer Wing Sheet (Left Panel Alt)" })} />
                        <ImagePlaceholder label="FT-Explorer Decals & Stickers" src="/src/assets/images/explorer_decals.jpg" onClick={() => setLightbox({ src: "/src/assets/images/explorer_decals.jpg", label: "FT-Explorer Decals & Stickers" })} />
                      </div>
                    </>
                  ) : isSpear ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro (6 Nos)</p>
                          <p>• Pushrods (2pcs 20cm each)</p>
                          <p>• Pushrod Connectors (2)</p>
                          <p>• Zipties (4)</p>
                          <p>• Aeroply Parts</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Motor Mount</p>
                          <p>• Control Horns (2)</p>
                          <p>• Camera Pod Parts (4)</p>
                          <p>• Canopy Lock sets (4Pcs)</p>
                          <p>• Spar</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        <ImagePlaceholder label="FT-Spear Wing Cutout Sheet" src="/src/assets/images/spear_sheet_wing_cutout.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spear_sheet_wing_cutout.jpg", label: "FT-Spear Wing Cutout Sheet" })} />
                        <ImagePlaceholder label="FT-Spear Wing Joiner Sheet" src="/src/assets/images/spear_sheet_wing_joiner.png" onClick={() => setLightbox({ src: "/src/assets/images/spear_sheet_wing_joiner.png", label: "FT-Spear Wing Joiner Sheet" })} />
                        <ImagePlaceholder label="FT-Spear Sheets B & C (Elevons & Spars)" src="/src/assets/images/spear_sheet_bc.png" onClick={() => setLightbox({ src: "/src/assets/images/spear_sheet_bc.png", label: "FT-Spear Sheets B & C (Elevons & Spars)" })} />
                        <ImagePlaceholder label="FT-Spear Sheet E (Right Wing Panel)" src="/src/assets/images/spear_sheet_e.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spear_sheet_e.jpg", label: "FT-Spear Sheet E (Right Wing Panel)" })} />
                        <ImagePlaceholder label="FT-Spear Sheet F (Left Wing Panel)" src="/src/assets/images/spear_sheet_f.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spear_sheet_f.jpg", label: "FT-Spear Sheet F (Left Wing Panel)" })} />
                        <ImagePlaceholder label="FT-Spear Accessories & Hardware Pack" src="/src/assets/images/spear_accessories.jpg" onClick={() => setLightbox({ src: "/src/assets/images/spear_accessories.jpg", label: "FT-Spear Accessories & Hardware Pack" })} />
                      </div>
                    </>
                  ) : isRaptor ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro (3 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrods (2pcs) ~29cm ea</p>
                          <p>• Pushrod Connectors (2)</p>
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                          <p>• ABS Canopy cover</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <ImagePlaceholder label="FT-22 Raptor Sheets A & B (Fuselage & Canopy)" src="/src/assets/images/raptor_sheet_ab.jpg" onClick={() => setLightbox({ src: "/src/assets/images/raptor_sheet_ab.jpg", label: "FT-22 Raptor Sheets A & B (Fuselage & Canopy)" })} />
                          <ImagePlaceholder label="FT-22 Raptor Wing & Elevon Sheet" src="/src/assets/images/raptor_sheet_wing.jpg" onClick={() => setLightbox({ src: "/src/assets/images/raptor_sheet_wing.jpg", label: "FT-22 Raptor Wing & Elevon Sheet" })} />
                        </div>
                        <div className="w-full">
                          <ImagePlaceholder label="FT-22 Raptor Accessories & Hardware Kit" src="/src/assets/images/raptor_accessories.png" onClick={() => setLightbox({ src: "/src/assets/images/raptor_accessories.png", label: "FT-22 Raptor Accessories & Hardware Kit" })} aspect="aspect-[3/1]" />
                        </div>
                      </div>
                    </>
                  ) : isOldFogey ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Laser Cut Fliteboard Lite Sheets (4 Nos)</p>
                          <p>• Laser Cut AlphaBoard Sheet (1 Nos)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (2)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrods (2pcs) (50Cm length)</p>
                          <p>• Pushrod Connectors (2)</p>
                          <p>• Pushrod Guides (2 Long)</p>
                          <p>• Bamboo Sticks (1 long + 3 short)</p>
                          <p>• EPP Foam Wheel Set (2 pcs)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Wheel Collars (4)</p>
                          <p>• Landing gear wire (15in)</p>
                          <p>• Velcro</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Data Sheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                        <ImagePlaceholder label="Old Fogey Power Pod Sheet" src="/src/assets/images/fogey_sheet_powerpod.jpg" onClick={() => setLightbox({ src: "/src/assets/images/fogey_sheet_powerpod.jpg", label: "Old Fogey Power Pod Sheet" })} />
                        <ImagePlaceholder label="Old Fogey Wing Sheet" src="/src/assets/images/fogey_sheet_wing.jpg" onClick={() => setLightbox({ src: "/src/assets/images/fogey_sheet_wing.jpg", label: "Old Fogey Wing Sheet" })} />
                        <ImagePlaceholder label="Old Fogey Fuselage Sheet" src="/src/assets/images/fogey_sheet_fuselage.jpg" onClick={() => setLightbox({ src: "/src/assets/images/fogey_sheet_fuselage.jpg", label: "Old Fogey Fuselage Sheet" })} />
                        <ImagePlaceholder label="Old Fogey Accessories & Hardware Kit" src="/src/assets/images/fogey_accessories.jpg" onClick={() => setLightbox({ src: "/src/assets/images/fogey_accessories.jpg", label: "Old Fogey Accessories & Hardware Kit" })} />
                      </div>
                    </>
                  ) : isBaron ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-gray-700">
                        <div className="space-y-2">
                          <p>• Fliteboard Pro</p>
                          <p>• Precision Laser-cut Fliteboard Pro sheets (4 Nos.)</p>
                          <p>• Aeroply Parts</p>
                          <p>• Motor Mount</p>
                          <p>• Control Horns (4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrods (4pcs) (30cm, 20cm, 16cmx2)</p>
                          <p>• Pushrod Linkage Connector (4pcs)</p>
                          <p>• Velcro</p>
                          <p>• Bamboo Skewers (4)</p>
                        </div>
                        <div className="space-y-2">
                          <p>• Pushrod guide</p>
                          <p>• Paper knife</p>
                          <p>• Decals</p>
                          <p>• Datasheet</p>
                        </div>
                      </div>
                      
                      {/* Kit content images */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        <ImagePlaceholder label="Bloody Baron Sheets A & B (Fuselage & Doublers)" src="/src/assets/images/baron_sheet_ab.jpg" onClick={() => setLightbox({ src: "/src/assets/images/baron_sheet_ab.jpg", label: "Bloody Baron Sheets A & B (Fuselage & Doublers)" })} />
                        <ImagePlaceholder label="Bloody Baron Sheets C & D (Power Pod & Stabilizers)" src="/src/assets/images/baron_sheet_cd.jpg" onClick={() => setLightbox({ src: "/src/assets/images/baron_sheet_cd.jpg", label: "Bloody Baron Sheets C & D (Power Pod & Stabilizers)" })} />
                        <ImagePlaceholder label="Bloody Baron Wing Panel Sheet" src="/src/assets/images/baron_sheet_wing.jpg" onClick={() => setLightbox({ src: "/src/assets/images/baron_sheet_wing.jpg", label: "Bloody Baron Wing Panel Sheet" })} />
                      </div>
                    </>
                  ) : (
                    <>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                        <ImagePlaceholder label="Simple Trainer Left Wing" src="/src/assets/images/trainer_left_wing.png" onClick={() => setLightbox({ src: "/src/assets/images/trainer_left_wing.png", label: "Simple Trainer Left Wing" })} />
                        <ImagePlaceholder label="Simple Trainer Right Wing" src="/src/assets/images/trainer_right_wing.png" onClick={() => setLightbox({ src: "/src/assets/images/trainer_right_wing.png", label: "Simple Trainer Right Wing" })} />
                        <ImagePlaceholder label="Simple Trainer Sheets A & B (Fuselage / Stabilizers)" src="/src/assets/images/trainer_sheets.png" onClick={() => setLightbox({ src: "/src/assets/images/trainer_sheets.png", label: "Simple Trainer Sheets A & B (Fuselage / Stabilizers)" })} />
                        <ImagePlaceholder label="EPP Trainer Hardware & Accessories Kit" src="/src/assets/images/trainer_accessories.jpg" onClick={() => setLightbox({ src: "/src/assets/images/trainer_accessories.jpg", label: "EPP Trainer Hardware & Accessories Kit" })} />
                      </div>
                    </>
                  )}
                </div>
 
                {/* Kit Options - Electronics */}
                <div className="bg-[#fcfcfc] rounded-2xl border border-gray-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="font-extrabold text-[#dd3333] text-base uppercase tracking-wider border-b pb-2">Kit Options - Electronics</h4>
                    <p className="font-bold text-gray-800 text-sm">Optional Electronics Pack Includes :</p>
                    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-700 pl-4 list-disc">
                      {isViggen ? (
                        <>
                          <li>4 Nos. 9 gm Digital Servos</li>
                          <li>1 Nos. 30Amp Brushless ESC (Speed controller)</li>
                          <li>1 Nos. 2212 1400Kv Brushless Motor</li>
                          <li>1 Nos. 8x4.5 or 9x4.7 Propellor</li>
                          <li>Thrust Vectoring Metal Wires & Pushrod Connectors</li>
                          <li>Heatshrink Tube and Custom Wire Harness</li>
                        </>
                      ) : isGuineaPig ? (
                        <>
                          <li>4 Nos. 9 gm Servos</li>
                          <li>2 Nos. 30Amp Brushless ESCs (Speed controllers)</li>
                          <li>2 Nos. 2212 1400Kv Brushless Motors</li>
                          <li>2 Nos. 8x4.5 or 9x4.7 Propellors</li>
                          <li>Servo Extension Cables & Y-Harness</li>
                          <li>XT60 Battery Connectors & Bullet Connectors</li>
                        </>
                      ) : (
                        <>
                          <li>2 Nos. 9 gm Servos</li>
                          <li>1 Nos. 30Amp Brushless ESC (Speed controller)</li>
                          <li>1 Nos. DYS CF2822 1200Kv Brushless Motor</li>
                          <li>1 Nos. 9×4.7 Propellor</li>
                          <li>3 Nos. Male Bullet Connectors ( For Motor Leads )</li>
                          <li>Heatshrink Tube Piece 4MM Red</li>
                          <li>Heatshrink Tube Piece 4MM Black</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="md:col-span-5 rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-4/3 bg-gray-50 flex items-center justify-center p-2">
                    <img 
                      src={isViggen ? "/src/assets/images/viggen_accessories.png" : isMustang ? "/src/assets/images/mustang_electronics.jpg" : isSpitfire ? "/src/assets/images/spitfire_electronics.jpg" : isGuineaPig ? "/src/assets/images/guinea_pig_electronics.jpg" : isStorch ? "/src/assets/images/storch_electronics.jpg" : isExplorer ? "/src/assets/images/explorer_electronics.jpg" : isSpear ? "/src/assets/images/spear_electronics.jpg" : isRaptor ? "/src/assets/images/raptor_electronics.jpg" : isOldFogey ? "/src/assets/images/fogey_electronics.jpg" : isBaron ? "/src/assets/images/baron_electronics.jpg" : "/src/assets/images/epp_trainer_electronics.png"} 
                      alt="Optional electronics package" 
                      className="max-w-full max-h-full object-contain" 
                      onError={(e) => {
                        // fallback to standard electronics image if viggen specific accessory photo is missing
                        if (isViggen) {
                          e.target.src = "/src/assets/images/epp_trainer_electronics.png";
                        }
                      }}
                    />
                  </div>
                </div>
 
                {/* Build, Flying Levels & Expert Advice */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Progress bars */}
                  <div ref={progressRef} className="md:col-span-7 space-y-5">
                    {/* Build Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>Build Level - {isViggen ? 'INTERMEDIATE' : (isMustang || isSpitfire) ? 'INTERMEDIATE' : 'EASY'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? (isViggen ? '60%' : isSpitfire ? '75%' : isMustang ? '70%' : '85%') : '0%', 
                            transition: 'width 1.2s ease-out' 
                          }}
                        ></div>
                      </div>
                    </div>
 
                    {/* Flying Level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>Flying Level - {isViggen ? 'INTERMEDIATE / ADVANCED' : isSpitfire ? 'INTERMEDIATE / ADVANCED' : isMustang ? 'INTERMEDIATE' : 'EASY'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? (isViggen ? '50%' : isSpitfire ? '70%' : isMustang ? '65%' : '90%') : '0%', 
                            transition: 'width 1.2s ease-out 0.2s' 
                          }}
                        ></div>
                      </div>
                    </div>
 
                    {/* Cost Effective */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-800">
                        <span>{isViggen ? 'Performance - HIGH SPEED JET' : isSpitfire ? 'Performance - SCALE FIGHTER' : isMustang ? 'Performance - SPORT WARBIRD' : 'Cost Effective - ULTRA ECONOMICAL'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                        <div 
                          className="bg-[#5cb85c] h-full rounded-full" 
                          style={{ 
                            width: animateProgress ? (isViggen ? '95%' : isSpitfire ? '85%' : isMustang ? '80%' : '95%') : '0%', 
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
                        {isViggen 
                          ? '"The FT-Viggen is a phenomenal thrust-vectoring jet. Best suited for pilots who already have some building and multi-axis flight experience."'
                          : isSpitfire 
                          ? '"The Supermarine Spitfire features advanced elliptical wings. It handles incredibly smoothly in turns but requires active pilot management."'
                          : isMustang 
                          ? '"The P-51D Mustang is a classic scale warbird. Ideal for pilots looking to transition into scale sport models."'
                          : '"The VT-Simple Trainer is exceptionally easy to build, and fly. Ideal for the first time Builder and flier."'
                        }
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
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
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

      {/* Lightbox Modal */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-4 sm:p-6 transition-all duration-300"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-all focus:outline-none shadow-md"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Container */}
          <div 
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl max-w-full">
              <img 
                src={lightbox.src} 
                alt={lightbox.label} 
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />
              <div className="p-4 bg-neutral-900 text-center border-t border-neutral-800">
                <p className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">{lightbox.label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
