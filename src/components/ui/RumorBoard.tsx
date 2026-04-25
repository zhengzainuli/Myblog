"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText } from "lucide-react";

const rumors = [
  "老板娘：听说村东头的史莱姆又变异了，去的时候带上解毒药剂！",
  "流浪法师：给我一杯上好的矮人麦酒，我就告诉你巨龙宝藏的下落...",
  "吟游诗人：最近酒馆的地下室晚上总有奇怪的声音，老板娘正在高价悬赏勇者。",
  "酒客：别去招惹那个穿黑斗篷的法师，他昨天把一整个哥布林营地变成了羊。",
  "神秘人：按左下角的那个按钮...千万别按太多次，有可怕的事情会发生！",
  "铁匠：我的火炉需要更多稀有矿石，谁能帮我去深渊走一趟？",
];

export function RumorBoard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Rotate rumor every 6 seconds
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rumors.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#3e2731] text-[#f4e4ba] p-3 pixel-border border-[#2a1a21] mt-4 mb-8">
      {/* 钉在墙上的小图钉 */}
      <div className="absolute -top-2 left-4 w-3 h-3 bg-gray-400 rounded-full border border-black shadow-md z-10"></div>
      <div className="absolute -top-2 right-4 w-3 h-3 bg-gray-400 rounded-full border border-black shadow-md z-10"></div>
      
      <div className="flex items-start gap-3 relative z-0">
        <motion.div 
           className="mt-1"
           animate={{ rotate: [0, -10, 10, 0] }} 
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageSquareText size={20} className="text-[#ffb703]" />
        </motion.div>
        
        <div className="flex-1 overflow-hidden min-h-[30px] md:min-h-[24px] relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, type: "tween" }}
              className="absolute inset-0 font-silkscreen text-xs md:text-sm leading-relaxed"
            >
              <span className="font-bold text-[#ffb703] mr-2">[酒馆传闻]</span>
              {rumors[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}