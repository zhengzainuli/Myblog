"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export function SquishyButton() {
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [comboTimer, setComboTimer] = useState(100); // 100% combo time
  const decreaseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manage combo decay
  useEffect(() => {
    if (clickCount > 0) {
      if (decreaseIntervalRef.current) clearInterval(decreaseIntervalRef.current);
      
      // Start draining combo timer
      decreaseIntervalRef.current = setInterval(() => {
        setComboTimer((prev) => {
          if (prev <= 0) {
            // Timer ran out, drop click count significantly or to 0
            setClickCount((count) => Math.max(0, count - Math.ceil(count * 0.1) - 1));
            return 100; // Reset timer for the next drop
          }
          // The higher the click count, the faster it drains!
          const drainRate = 1 + Math.floor(clickCount / 20);
          return prev - drainRate;
        });
      }, 50);
    } else {
      if (decreaseIntervalRef.current) clearInterval(decreaseIntervalRef.current);
      setComboTimer(100);
    }

    return () => {
      if (decreaseIntervalRef.current) clearInterval(decreaseIntervalRef.current);
    };
  }, [clickCount]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount((prev) => prev + 1);
    setComboTimer(100); // Reset combo timer on click

    // Generate random particles around the click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1000);
  };

  // Determine button color based on click count for extra fun
  const getColors = () => {
    if (clickCount < 10) return "bg-success border-[#2e7d32]";
    if (clickCount < 30) return "bg-[#3b82f6] border-[#1d4ed8]"; // Blue
    if (clickCount < 50) return "bg-[#a855f7] border-[#7e22ce]"; // Purple
    return "bg-[#ef4444] border-[#b91c1c]"; // Red
  };

  return (
    <div className="relative inline-flex flex-col items-center w-full">
      <motion.button
        onClick={handleClick}
        className={`relative ${getColors()} text-white font-press-start text-xs w-full py-4 pixel-border select-none overflow-hidden outline-none`}
        style={{
          boxShadow: 'inset -4px -4px 0px 0px rgba(0,0,0,0.3)',
        }}
        // The squishy spring animation
        whileHover={{ scale: 1.05 }}
        animate={
          comboTimer < 30 && clickCount > 10 
            ? { x: [-2, 2, -2, 2, 0], transition: { duration: 0.2, repeat: Infinity } } 
            : { x: 0 }
        }
        whileTap={{ 
          scale: 0.85, 
          borderRadius: "16px", // Squish the corners
          boxShadow: 'inset 4px 4px 0px 0px rgba(0,0,0,0.4)', // Invert shadow
          transition: { type: "spring", stiffness: 400, damping: 10 } 
        }}
      >
        {/* Combo Timer Background Bar */}
        {clickCount > 0 && (
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-white/40"
            style={{ width: `${comboTimer}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        )}

        <span className="relative z-10 flex items-center justify-center drop-shadow-md">
          <Sparkles size={24} className={clickCount >= 50 ? "animate-spin text-yellow-300" : ""} />
        </span>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
              animate={{
                opacity: 0,
                scale: Math.random() * 1.5 + 0.5,
                x: p.x + (Math.random() - 0.5) * 100,
                y: p.y + (Math.random() - 0.5) * 100 - 50,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute pointer-events-none text-[#ffd700]"
            >
              <Star size={12} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.button>

      {/* Floating click counter badge */}
      <AnimatePresence>
        {clickCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={clickCount} // Re-animate on every count change
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-6 -right-4 bg-accent text-primary font-press-start text-[8px] px-2 py-1 pixel-border z-20"
          >
            x{clickCount}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}