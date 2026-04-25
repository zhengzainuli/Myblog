"use client";

import { Ghost, Home } from "lucide-react";
import { PixelButton } from "@/components/ui/PixelButton";
import { PageTransition } from "@/components/ui/PageTransition";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 pixel-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="mb-8 relative"
          >
            <Ghost size={120} className="text-accent/80 drop-shadow-[0_8px_0_rgba(0,0,0,0.1)]" />
            <motion.div 
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2 w-4 h-4 bg-[#87ceeb] rounded-full blur-md"
            ></motion.div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-press-start text-accent mb-6 drop-shadow-md">
            404
          </h1>
          
          <h2 className="text-xl md:text-3xl font-press-start text-accent mb-8 leading-relaxed">
            未找到页面
          </h2>

          <p className="font-silkscreen text-accent/80 text-lg md:text-xl mb-12 max-w-md">
            公主在另一个城堡里... 或者这个页面根本不存在。
          </p>

          <PixelButton href="/" variant="success" className="text-sm px-6 py-3 flex items-center gap-3">
            <Home size={18} />
            返回基地
          </PixelButton>
        </div>

        {/* Decorative scenery elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-around opacity-30 pointer-events-none">
          <div className="w-16 h-24 bg-accent pixel-border border-b-0 mb-[-4px]"></div>
          <div className="w-24 h-16 bg-accent pixel-border border-b-0 mb-[-4px]"></div>
          <div className="w-12 h-32 bg-accent pixel-border border-b-0 mb-[-4px]"></div>
        </div>
      </div>
    </PageTransition>
  );
}