import React from 'react';
import Link from 'next/link';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'secondary' | 'accent';
  href?: string;
}

export function PixelButton({ 
  children, 
  className = '', 
  variant = 'primary',
  href,
  ...props 
}: PixelButtonProps) {
  const baseClasses = "pixel-border px-4 py-2 font-press-start text-xs uppercase transition-transform active:translate-x-1 active:translate-y-1 relative outline-none focus:outline-none inline-block text-center";
  
  const variantClasses = {
    primary: "bg-primary text-accent hover:bg-[#e0d0a5]",
    success: "bg-success text-white hover:bg-green-600",
    secondary: "bg-secondary text-accent hover:bg-gray-100",
    accent: "bg-accent text-primary hover:bg-[#2a1a21]",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...(props as any)}>
        <div className="absolute inset-0 border-b-4 border-r-4 border-black/20 pointer-events-none"></div>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClasses}
      {...props}
    >
      <div className="absolute inset-0 border-b-4 border-r-4 border-black/20 pointer-events-none"></div>
      {children}
    </button>
  );
}
