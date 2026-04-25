import React from 'react';

interface PixelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PixelContainer({ 
  children, 
  className = '', 
  ...props 
}: PixelContainerProps) {
  return (
    <div 
      className={`relative p-8 pixel-border bg-primary/50 backdrop-blur-sm ${className}`}
      {...props}
    >
      {/* 边角装饰 - 左上 */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-accent"></div>
      <div className="absolute top-2 left-4 w-2 h-2 bg-accent/30"></div>
      <div className="absolute top-4 left-2 w-2 h-2 bg-accent/30"></div>

      {/* 边角装饰 - 右上 */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-accent"></div>
      <div className="absolute top-2 right-4 w-2 h-2 bg-accent/30"></div>
      <div className="absolute top-4 right-2 w-2 h-2 bg-accent/30"></div>

      {/* 边角装饰 - 左下 */}
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent"></div>
      <div className="absolute bottom-2 left-4 w-2 h-2 bg-accent/30"></div>
      <div className="absolute bottom-4 left-2 w-2 h-2 bg-accent/30"></div>

      {/* 边角装饰 - 右下 */}
      <div className="absolute bottom-2 right-2 w-2 h-2 bg-accent"></div>
      <div className="absolute bottom-2 right-4 w-2 h-2 bg-accent/30"></div>
      <div className="absolute bottom-4 right-2 w-2 h-2 bg-accent/30"></div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
