"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Ember {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

export function TavernEmbers() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    // Generate random embers on client-side to avoid hydration mismatch
    const newEmbers = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 4 + 3, // 3s to 7s
      delay: Math.random() * 5, // 0s to 5s delay
    }));
    setEmbers(newEmbers);
  }, []);

  if (embers.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-50">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute bottom-[-10px] bg-[#ffb703] rounded-[1px]"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            boxShadow: `0 0 ${ember.size * 2}px rgba(255, 150, 0, 0.8)`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 800], // Float up randomly
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50], // Drift horizontally
            opacity: [0, 0.8, 0], // Fade in and out
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}