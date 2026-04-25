"use client";

import React from "react";
import { motion } from "framer-motion";

export function PixelTorch() {
  return (
    <div className="relative flex flex-col items-center justify-center w-8 h-12">
      {/* Outer Flame Glow */}
      <motion.div
        className="absolute bottom-5 w-4 h-4 bg-orange-500 z-10"
        style={{ boxShadow: '0 0 15px 6px rgba(255, 120, 0, 0.7)' }}
        animate={{
          scale: [1, 1.3, 0.8, 1.2, 1],
          opacity: [0.7, 1, 0.6, 1, 0.8],
          y: [0, -2, 1, -1, 0],
          backgroundColor: ["#f97316", "#ef4444", "#f59e0b", "#f97316"],
          borderRadius: ["0%", "20%", "10%", "30%", "0%"]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Inner Flame Core */}
      <motion.div
        className="absolute bottom-5 w-2 h-2 bg-yellow-300 z-20"
        animate={{
          scale: [1, 0.7, 1.3, 1],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Torch Handle / Stick */}
      <div className="absolute bottom-0 w-3 h-6 bg-[#5c3a21] border-x-2 border-b-2 border-[#3e2731]">
         <div className="w-full h-1 bg-[#3e2731] absolute top-1"></div>
         <div className="w-full h-1 bg-[#3e2731] absolute bottom-1"></div>
      </div>
    </div>
  );
}