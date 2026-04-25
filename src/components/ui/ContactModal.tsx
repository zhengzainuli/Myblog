"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';
import { PixelButton } from './PixelButton';
import { PixelContainer } from './PixelContainer';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Handle escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-sm"
          >
            <PixelContainer className="bg-secondary shadow-2xl p-6 md:p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-accent/50 hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 bg-success pixel-border mb-6 flex items-center justify-center">
                  <Smartphone size={32} className="text-white" />
                </div>
                
                <h3 className="font-press-start text-lg md:text-xl text-accent mb-4">
                  联系酒馆
                </h3>
                
                <p className="font-silkscreen text-accent/80 mb-8 text-sm leading-relaxed">
                  酒馆老板随时准备聊天。添加微信来讨论任务、bug 或者只是打个招呼！
                </p>
                
                <div className="bg-primary pixel-border px-6 py-4 w-full flex flex-col items-center gap-2 mb-6">
                  <span className="font-press-start text-[10px] text-accent/60 uppercase">
                    微信号
                  </span>
                  <span className="font-press-start text-sm md:text-base text-accent tracking-widest">
                    18226147417
                  </span>
                </div>
                
                <PixelButton variant="primary" onClick={onClose} className="w-full">
                  关闭窗口
                </PixelButton>
              </div>
            </PixelContainer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}