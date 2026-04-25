import React from 'react';
import { motion } from 'framer-motion';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function PixelCard({ 
  title, 
  children, 
  className = '', 
  ...props 
}: PixelCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4, x: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative pixel-border bg-[#fffdf0] flex flex-col group ${className}`}
      style={{
        boxShadow: '6px 6px 0px 0px rgba(62, 39, 49, 0.4)', // Base shadow for that card/parchment look
      }}
      {...props}
    >
      {/* 悬停时加深的阴影 */}
      <div className="absolute inset-0 w-full h-full pointer-events-none group-hover:shadow-[10px_10px_0px_0px_rgba(62,39,49,0.3)] transition-shadow duration-200"></div>

      {/* 内部第二层边框装饰 */}
      <div className="absolute inset-1 border border-accent/20 pointer-events-none z-10"></div>
      
      {title && (
        <div className="bg-primary px-3 py-2 border-b-2 border-primary mb-1 z-20 flex justify-between items-center">
          <h3 className="font-press-start text-xs sm:text-sm text-accent tracking-widest uppercase m-0">
            {title}
          </h3>
          {/* 装饰性点点 */}
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-accent/30"></div>
            <div className="w-1.5 h-1.5 bg-accent/30"></div>
          </div>
        </div>
      )}
      
      <div className="p-4 z-20 flex-1 flex flex-col relative bg-[#fffdf0]">
        {children}
      </div>
    </motion.div>
  );
}
