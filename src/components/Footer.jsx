import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin, ShieldCheck, Truck, Headphones, ArrowRight, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import footerBg from '../assets/images/vt_trainer_action_1784882915807.jpg';
import rcLogo from '../assets/images/rc-plane-zone-logo.jpg';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Thank you for subscribing to Rc Plane Hub Flight Club news!', 'success');
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-[#1F2937] text-gray-300 pt-12 pb-8 border-t border-gray-800">
      {/* Full Background Image Watermark */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-[0.12] pointer-events-none select-none z-0"
        style={{ backgroundImage: `url(${footerBg})` }}
      />

      {/* Top Value Badges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 mb-8 border-b border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/40 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Free Express Shipping</h4>
            <p className="text-xs text-gray-400 mt-0.5">On all orders over ₹12,000</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/40 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">1-Year Factory Warranty</h4>
            <p className="text-xs text-gray-400 mt-0.5">Full coverage on parts & electronics</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/40 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Lifetime Flight Support</h4>
            <p className="text-xs text-gray-400 mt-0.5">Expert pilot advice via phone or chat</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/40 border border-gray-800">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center flex-shrink-0">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Guaranteed Spare Parts</h4>
            <p className="text-xs text-gray-400 mt-0.5">Complete replacement part inventory</p>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
            <img src={rcLogo} alt="Rc Plane Hub Logo" className="w-9 h-9 rounded-xl object-cover shadow-md" />
            <span className="font-extrabold tracking-tight text-white text-xl">
              RC <span className="text-[#2563EB]">PLANE HUB</span>
            </span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Offering high-performance, crash-resistant trainer RC aircraft and premium accessories. Experience ultimate flight control and stability with our next-gen aviation technology.
          </p>
          <div className="text-xs text-gray-400 space-y-1.5 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>+918004787983 (Mon-Sat 8am-6pm EST)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>support@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Inflection Org Private Ltd . </span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3 pt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300" aria-label="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/aircraft" className="hover:text-white transition">VT-Simple Trainer</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
            <li><Link to="/specifications" className="hover:text-white transition">Full Specs</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition">Photo Gallery</Link></li>
            <li><Link to="/videos" className="hover:text-white transition">Flight Videos</Link></li>
            <li><Link to="/training" className="hover:text-white transition">Flight Academy</Link></li>
            <li><Link to="/accessories" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/support" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="/reviews" className="hover:text-white transition">Pilot Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Rc Plane Hub</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Flight Club Newsletter</h4>
          <p className="text-xs text-gray-400">
            Subscribe for flight tips, new accessories releases, and exclusive member discounts.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3.5 py-2 bg-gray-800 border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] flex-1"
            />
            <button
              type="submit"
              aria-label="Subscribe to Newsletter"
              className="px-4 py-2 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[11px] text-gray-500">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>
          © {new Date().getFullYear()} Rc Plane Hub. All rights reserved. "VT-Simple Trainer" and "VT-Stabilize" are registered trademarks.
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link to="/privacy" className="hover:text-gray-400 transition">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-400 transition">Terms</Link>
          <Link to="/sitemap" className="hover:text-gray-400 transition">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
