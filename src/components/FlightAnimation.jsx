import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Wind, Compass, Zap, RotateCcw } from 'lucide-react';

export default function FlightAnimation() {
  const [activeMode, setActiveMode] = useState('beginner'); // beginner, intermediate, expert
  const [isWindActive, setIsWindActive] = useState(true);

  const modeDetails = {
    beginner: {
      title: 'Beginner Mode (Self-Leveling)',
      bankLimit: '30° Bank Limit',
      description: 'Full 6-Axis MEMS gyro auto-leveling. Plane returns to level flight automatically when sticks are centered.',
      tilt: 12,
      stability: '100%',
      color: 'bg-emerald-500'
    },
    intermediate: {
      title: 'Intermediate Mode (Smooth Agility)',
      bankLimit: '60° Bank Limit',
      description: 'Expanded bank and pitch freedom for tighter turns while keeping gyro gust cancellation fully active.',
      tilt: 28,
      stability: '85%',
      color: 'bg-blue-500'
    },
    expert: {
      title: 'Expert Mode (Full Aerobatics)',
      bankLimit: 'Unlimited 360°',
      description: 'All angle caps disabled for loops, rolls, and inverted flight while retaining gyro wind suppression.',
      tilt: 45,
      stability: '70%',
      color: 'bg-purple-500'
    }
  };

  const current = modeDetails[activeMode];

  return (
    <div className="bg-gradient-to-b from-[#1F3A5F] to-[#111827] text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative border border-slate-700/50">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column - Flight Control Console */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
              <Zap className="w-3.5 h-3.5" /> VT-Stabilize Technology
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Interactive 6-Axis Gyro Simulator
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Experience how our proprietary flight controller continuously calculates pitch, roll, and yaw 1,000 times per second to maintain effortless stability.
            </p>
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-3 gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
            {['beginner', 'intermediate', 'expert'].map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                  activeMode === mode
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Active Mode Info Card */}
          <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-white">{current.title}</span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full text-white ${current.color}`}>
                {current.bankLimit}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">{current.description}</p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Auto-Level: <strong className="text-white">{current.stability}</strong></span>
              </div>
              <button
                onClick={() => setIsWindActive(!isWindActive)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
                  isWindActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                {isWindActive ? 'Wind Gust On' : 'Wind Calm'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Visual Flight Horizon Animation */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[320px] bg-slate-900/60 rounded-2xl border border-slate-700/80 p-6 overflow-hidden">
          {/* Artificial Horizon Lines */}
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-20">
            <div className="w-full h-0.5 bg-blue-400/50" />
            <div className="w-0.5 h-full bg-blue-400/50" />
            <div className="w-32 h-32 rounded-full border border-blue-400/40" />
            <div className="w-48 h-48 rounded-full border border-blue-400/20" />
          </div>

          {/* Wind particle indicators */}
          {isWindActive && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ x: [-100, 400], y: [-10, 10] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute top-1/4 left-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
              />
              <motion.div
                animate={{ x: [-120, 380], y: [10, -10] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear', delay: 0.4 }}
                className="absolute top-2/3 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
              />
            </div>
          )}

          {/* Aircraft Horizon Vector */}
          <motion.div
            animate={{
              rotate: isWindActive ? [current.tilt, -current.tilt / 2, current.tilt / 3, 0] : [current.tilt, 0],
              y: isWindActive ? [-6, 6, -3, 0] : [0, 0]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
              y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* RC Aircraft Silhouette Vector */}
            <svg className="w-64 h-32 text-blue-400 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main Wings */}
              <path d="M 120 40 L 10 30 L 25 50 L 120 52 L 215 50 L 230 30 Z" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Fuselage */}
              <path d="M 120 15 C 130 15 135 35 130 95 L 120 105 L 110 95 C 105 35 110 15 120 15 Z" fill="#1F3A5F" stroke="#38BDF8" strokeWidth="1.5" />
              {/* Cockpit Canopy */}
              <ellipse cx="120" cy="35" rx="7" ry="12" fill="#38BDF8" opacity="0.8" />
              {/* Tail Wing */}
              <path d="M 120 85 L 85 98 L 92 105 L 120 100 L 148 105 L 155 98 Z" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
              {/* Propeller Disk */}
              <ellipse cx="120" cy="15" rx="20" ry="2" fill="#93C5FD" opacity="0.6" />
            </svg>

            <span className="mt-4 text-xs font-mono text-cyan-300 tracking-wider bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              PITCH: 0.0° | ROLL: 0.0° | AUTO-CORRECT: ACTIVE
            </span>
          </motion.div>

          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-400" /> Heading: 090° (EAST)
            </span>
            <span className="text-emerald-400 font-semibold">
              VT-STABILIZE: LOCKED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
