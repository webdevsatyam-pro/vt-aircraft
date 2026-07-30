import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Plane, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Aircraft', path: '/aircraft' },
    { name: 'Shop', path: '/shop' },
    { name: 'Specifications', path: '/specifications' },
    { name: 'Training', path: '/training' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Videos', path: '/videos' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-sm border-b border-gray-200/80 py-3' : 'bg-white border-b border-gray-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#1F3A5F] flex items-center justify-center text-white shadow-md group-hover:bg-[#2563EB] transition-colors duration-300">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-gray-900 text-lg leading-none">
                VT <span className="text-[#2563EB]">AIRCRAFT</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-0.5 hidden sm:block">
                Learn to Fly with Confidence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 8).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search website"
              className="p-2 text-gray-600 hover:text-[#1F3A5F] hover:bg-gray-100 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <Link
              to="/product/vt-simple-trainer-rtf"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F3A5F] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-xs active:scale-95"
            >
              <span>Order RTF Kit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Drawer */}
        {searchOpen && (
          <div className="bg-white border-t border-gray-200 py-3 px-4 shadow-md animate-fade-in">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="max-w-3xl mx-auto flex items-center gap-2"
            >
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search RC Aircraft, Parts, Batteries, Accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 py-1"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <nav className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1F3A5F] flex items-center justify-center text-white">
                  <Plane className="w-4 h-4 transform -rotate-45" />
                </div>
                <span className="font-bold text-gray-900 text-base">VT Aircraft</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition ${
                      isActive ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-3">
            <Link
              to="/product/vt-simple-trainer-rtf"
              className="w-full py-3 bg-[#1F3A5F] hover:bg-[#2563EB] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition"
            >
              <span>Buy VT-Simple Trainer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <div className="text-center text-xs text-gray-500 pt-2">
              Need Help? Call <a href="tel:18005550199" className="text-[#2563EB] font-medium">1-800-555-0199</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Header Spacer to prevent layout overlap */}
      <div className="h-20" />
    </>
  );
}
