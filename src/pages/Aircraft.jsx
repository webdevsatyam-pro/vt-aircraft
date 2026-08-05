import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ShieldCheck, Zap, ArrowRight, Check } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FlightAnimation from '../components/FlightAnimation';

export default function Aircraft() {
  useSEO({
    title: 'VT-Simple Trainer RC Airplane | Aerodynamic Specs & Design',
    description: 'Explore the engineering features of the VT-Simple Trainer RC aircraft: 1100mm wingspan, high-lift dihedral wing, EPO foam, and VT-Stabilize 6-axis gyro.'
  });

  return (
    <div className="space-y-16 pb-16">
      <Breadcrumbs items={[{ name: 'Aircraft', url: '/aircraft' }, { name: 'VT-Simple Trainer', url: '/aircraft' }]} />

      {/* Hero Title */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">The Primary RC Trainer</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">VT-Simple Trainer Aircraft</h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Engineered for effortless stability, maximum crash resistance, and instant 1-click panic level recovery.
        </p>
      </section>

      {/* Large Product Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-900 group">
          <img
            src="/src/assets/images/vt_trainer_hero_1784882888882.jpg"
            alt="VT-Simple Trainer High Altitude Flight"
            className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Aero Mechanics</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">High-Wing Dihedral Configuration</h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-2 leading-relaxed">
              When a wing drops, the increased angle of attack on the lower wing generates corrective lift automatically, bringing the aircraft back to level flight naturally.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to="/product/vt-simple-trainer-rtf"
                className="px-6 py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-md transition"
              >
                Order RTF Complete Kit (₹2,999.00)
              </Link>
              <Link
                to="/specifications"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl transition backdrop-blur-md"
              >
                View Full Technical Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aerodynamic Features Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Construction & Materials</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ultra-Durable High Density EPO Foam</h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Standard styrofoam or thin plastic breaks easily upon rough landing. The VT-Simple Trainer utilizes high-density Expanded Polyolefin (EPO) foam reinforced with dual internal carbon fiber wing spars.
          </p>
          <div className="space-y-3 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold">✓</div>
              <span>Absorbs hard impacts without cracking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold">✓</div>
              <span>Field repairable in 5 minutes with foam-safe CA glue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold">✓</div>
              <span>Vibrant high-contrast decal coating for long-range visibility</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-md">
          <img
            src="/src/assets/images/epo_foam_trainer.jpg"
            alt="VT-Simple Trainer Construction Detail"
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Flight Gyro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">VT-Stabilize Flight Controller</h2>
          <p className="text-sm text-gray-500 mt-2">See how the 3-mode gyro system assists you as your skills evolve.</p>
        </div>
        <FlightAnimation />
      </section>
    </div>
  );
}
