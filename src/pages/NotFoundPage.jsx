import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Home, Search } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({
    title: '404 - Altitude Lost | Rc Plane Hub',
    description: 'The requested flight vector could not be located on our radar.'
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto shadow-md">
        <Plane className="w-10 h-10 transform -rotate-90" />
      </div>

      <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest font-mono">
        404 ERROR // VECTOR NOT FOUND
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Off Radar Horizon</h1>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
        The page or product link you clicked has drifted off course. Let's redirect you back to the main runway.
      </p>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#1F3A5F] hover:bg-[#2563EB] text-white font-semibold text-xs rounded-2xl shadow-md transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return To Homepage</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-2xl transition flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Search Aircraft Store</span>
        </Link>
      </div>
    </div>
  );
}
