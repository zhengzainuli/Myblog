import React from 'react';

interface PixelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'exp' | 'hp' | 'mp' | 'info';
  children: React.ReactNode;
}

export function PixelBadge({ 
  children, 
  variant = 'info', 
  className = '', 
  ...props 
}: PixelBadgeProps) {
  const baseClasses = "inline-flex items-center px-2 py-1 font-press-start text-[10px] leading-none uppercase relative z-10 border-2 border-accent";
  
  const variantStyles = {
    exp: "bg-[#ffd700] text-accent",
    hp: "bg-[#ff4040] text-white",
    mp: "bg-[#4040ff] text-white",
    info: "bg-secondary text-accent",
  };

  return (
    <span 
      className={`${baseClasses} ${variantStyles[variant]} ${className}`}
      style={{
        boxShadow: '2px 2px 0 0 var(--color-accent)'
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 border-t border-l border-white/40 pointer-events-none"></div>
      <span className="relative z-20 drop-shadow-sm">{children}</span>
    </span>
  );
}
