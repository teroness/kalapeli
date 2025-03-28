
import React, { useState, useEffect } from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
}

const Fish: React.FC<FishProps> = ({ position, direction }) => {
  // We'll create a simple SVG fish with the colors from the image
  return (
    <div className="absolute transform transition-transform duration-100" 
         style={{ 
           left: `${position.x}px`, 
           top: `${position.y}px`,
           transform: `scaleX(${direction === 'right' ? 1 : -1})`,
         }}>
      <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        {/* Fish body */}
        <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#FF5A79" />
        
        {/* Fish tail */}
        <path d="M38 20C38 20 50 5 60 0C55 10 55 30 60 40C50 35 38 20 38 20Z" fill="#7A2E8E" />
        
        {/* Fish eye */}
        <circle cx="15" cy="15" r="5" fill="#051C44" />
        <circle cx="13" cy="13" r="2" fill="white" />
        
        {/* Fish fins */}
        <path d="M25 8C25 8 30 0 35 3C30 8 25 8 25 8Z" fill="#7A2E8E" />
        <path d="M25 32C25 32 30 40 35 37C30 32 25 32 25 32Z" fill="#7A2E8E" />
      </svg>
    </div>
  );
};

export default Fish;
