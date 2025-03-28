
import React from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
  size?: number;
  isEating?: boolean;
}

const Fish: React.FC<FishProps> = ({ position, direction, size = 1, isEating = false }) => {
  return (
    <div className="absolute transform transition-transform duration-100" 
         style={{ 
           left: `${position.x}px`, 
           top: `${position.y}px`,
           transform: `scaleX(${direction === 'right' ? 1 : -1}) scale(${size})`,
         }}>
      <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        {/* Piranha body - using the pink color from the theme */}
        <path d="M10 20C10 15 15 5 35 5C50 5 58 12 58 20C58 28 50 35 35 35C15 35 10 25 10 20Z" fill="#FF5A79" />
        
        {/* Piranha tail - using bright orange instead of navy */}
        <path d="M10 20C10 20 0 10 0 5C0 10 0 30 0 35C5 30 10 20 10 20Z" fill="#FF9800" />
        
        {/* Piranha scales - more defined scale pattern */}
        <path d="M15 12C17 12 17 8 20 8" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M15 28C17 28 17 32 20 32" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M20 8C23 8 23 5 26 5" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M20 32C23 32 23 35 26 35" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 5C29 5 29 3 32 3" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 35C29 35 29 37 32 37" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 3C35 3 35 5 38 5" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 37C35 37 35 35 38 35" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M38 5C41 5 41 8 44 8" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M38 35C41 35 41 32 44 32" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales for detailed pattern - row 1 */}
        <path d="M20 12C22 11 24 10 26 10" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M20 28C22 29 24 30 26 30" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 10C28 9 30 8 32 8" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 30C28 31 30 32 32 32" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 8C34 8 36 9 38 10" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 32C34 32 36 31 38 30" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales for detailed pattern - row 2 */}
        <path d="M20 16C22 15 24 14 26 14" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M20 24C22 25 24 26 26 26" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 14C28 13 30 12 32 12" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 26C28 27 30 28 32 28" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 12C34 12 36 13 38 14" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 28C34 28 36 27 38 26" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Scale highlighting - row 3 (middle) */}
        <path d="M20 20C22 20 24 20 26 20" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M26 20C28 20 30 20 32 20" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M32 20C34 20 36 20 38 20" stroke="#FF3C62" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Piranha eye - using the light color from the theme */}
        <circle cx="45" cy="17" r="6" fill="white" />
        <circle cx="45" cy="17" r="3" fill="#051C44" />
        <circle cx="43" cy="15" r="1.5" fill="white" />
        
        {/* Piranha fins - using the purple color from the theme */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#7A2E8E" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#7A2E8E" />
        
        {/* Cheek blush using orange from theme */}
        <circle cx="35" cy="20" r="4" fill="#FF9800" opacity="0.7" />
        
        {/* Improved mouth shape - with animation for eating */}
        {isEating ? (
          <path d="M50 20C50 20 55 25 53 27C48 24 44 23 44 23C44 23 48 21 50 20Z" fill="#7A2E8E" strokeWidth="1" stroke="#7A2E8E" />
        ) : (
          <path d="M50 20C50 20 47 23 44 23C44 23 47 17 50 20Z" fill="#7A2E8E" strokeWidth="1" stroke="#7A2E8E" />
        )}
      </svg>
    </div>
  );
};

export default Fish;
