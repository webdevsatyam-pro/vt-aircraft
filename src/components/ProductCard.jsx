import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

export default function ProductCard({ product }) {
  const mainImage = Array.isArray(product.images) ? product.images[0] : (product.image || '/src/assets/images/vt_trainer_hero_1784882888882.jpg');
  const shopifyUrl = product.shopifyUrl || `https://your-shopify-store.myshopify.com/products/${product.slug || product.id}`;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full card-hover">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-[#1F3A5F] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
          {product.badge}
        </div>
      )}

      {/* Product Image Link */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block aspect-4/3 bg-gray-50 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </Link>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium text-[#2563EB] uppercase tracking-wider">{product.category}</span>
          <RatingStars rating={product.rating || 4.9} count={product.reviewCount} />
        </div>

        <Link to={`/product/${product.slug || product.id}`} className="group-hover:text-[#2563EB] transition-colors">
          <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{product.name}</h3>
        </Link>

        <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">{product.tagline || product.summary}</p>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {product.category === 'Aircraft'
                ? (product.id?.includes('pnp') ? '₹1,999.00' : (product.id === 'vt-lipo-battery-3s' ? '₹4,199.00' : (product.id === 'vt-6x-transmitter' ? '₹3,999.00' : (product.id === 'vt-guinea-pig' ? '₹8,999.00' : (product.id === 'vt-storch' ? '₹5,555.00' : (product.id === 'vt-explorer' ? '₹4,999.00' : (product.id === 'vt-spear' ? '₹3,999.00' : '₹2,999.00')))))))
                : `₹${Math.round(product.price * 80).toLocaleString('en-IN')}.00`}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">
                {product.category === 'Aircraft'
                  ? (product.id?.includes('pnp') ? '₹2,499.00' : (product.id === 'vt-lipo-battery-3s' ? '₹4,699.00' : (product.id === 'vt-6x-transmitter' ? '₹4,499.00' : (product.id === 'vt-guinea-pig' ? '₹9,499.00' : (product.id === 'vt-storch' ? '₹5,999.00' : (product.id === 'vt-explorer' ? '₹5,499.00' : (product.id === 'vt-spear' ? '₹4,499.00' : '₹3,499.00')))))))
                  : `₹${Math.round(product.originalPrice * 80).toLocaleString('en-IN')}.00`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-[#1F3A5F] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors duration-200 shadow-xs active:scale-95"
            >
              <span>Order Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
