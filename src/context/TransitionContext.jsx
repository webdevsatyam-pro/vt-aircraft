import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const triggerPlaneTransition = (targetUrl) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Navigate immediately so there is no boring delay!
    navigate(targetUrl);

    // Reset animation state after the plane completes its flight (3500ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 3500);
  };

  return (
    <TransitionContext.Provider value={{ triggerPlaneTransition, isAnimating }}>
      {children}
      
      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-100 pointer-events-none overflow-hidden">
            {/* Subtle blue screen wash that doesn't block the new page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.5 }}
              className="absolute inset-0 bg-blue-500/5 pointer-events-none"
            />

            {/* Flying Jet from Bottom-Right to Top-Left with a Loop-the-Loop Circle */}
            <motion.div
              style={{
                position: 'absolute',
                right: '-120px',
                bottom: '-120px',
              }}
              initial={{ x: '10vw', y: '10vh', rotate: -45, scale: 1.3 }}
              animate={{ 
                x: ['10vw', '-40vw', '-65vw', '-65vw', '-40vw', '-40vw', '-70vw', '-130vw'],
                y: ['10vh', '-30vh', '-30vh', '-65vh', '-65vh', '-40vh', '-70vh', '-130vh'],
                rotate: [-45, -90, -180, -270, -360, -405, -405, -405],
                scale: [1.3, 1.6, 1.6, 1.6, 1.6, 1.6, 1.4, 1.3]
              }}
              transition={{ 
                duration: 3.5, 
                times: [0, 0.22, 0.38, 0.54, 0.7, 0.78, 0.88, 1],
                ease: "easeInOut",
              }}
              className="flex items-center text-[#2563EB]"
            >
              {/* Detailed Fighter Jet SVG */}
              <div className="relative flex items-center justify-center">
                {/* Vapor Trails trailing behind (relative to the rotated plane) */}
                <div className="absolute top-[95%] flex flex-col gap-1.5 transform origin-top rotate-180">
                  <motion.div 
                    initial={{ height: 0, opacity: 0.9 }}
                    animate={{ height: 200, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-1.5 bg-gradient-to-t from-blue-500/80 to-transparent rounded-full origin-top shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                  <motion.div 
                    initial={{ height: 0, opacity: 0.9 }}
                    animate={{ height: 160, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
                    className="w-1 bg-gradient-to-t from-white/90 to-transparent rounded-full origin-top shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  />
                </div>

                <svg 
                  viewBox="0 0 24 24" 
                  width="100" 
                  height="100" 
                  fill="currentColor" 
                  className="text-blue-600 drop-shadow-[0_10px_20px_rgba(37,99,235,0.5)]"
                >
                  <path d="M21 16V14L13 9V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
                </svg>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function usePlaneTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePlaneTransition must be used within a TransitionProvider');
  }
  return context;
}
