"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedNavIconProps {
  icon: React.ReactNode;
  label: string;
}

export function AnimatedNavIcon({ icon, label }: AnimatedNavIconProps) {
  return (
    <motion.div
      className="flex items-center gap-3 w-full"
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        variants={{
          rest: { y: 0 },
          hover: { 
            y: [0, -4, 0],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
      >
        {icon}
      </motion.div>
      <span>{label}</span>
    </motion.div>
  );
}