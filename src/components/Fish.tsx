
import React from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
  size?: number;
  isEating?: boolean;
}

const Fish: React.FC<FishProps> = ({ position, direction, size = 1, isEating = false }) => {
  return (
    <div 
      className={`absolute transform transition-transform duration-100 ${isEating ? '' : 'animate-[swim_3s_ease-in-out_infinite]'}`}
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
        
        {/* Improved piranha scales - more defined pattern with realistic look */}
        <path d="M18 12C20 11 22 10 24 10" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M18 28C20 29 22 30 24 30" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M24 10C27 9 30 8 33 8" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M24 30C27 31 30 32 33 32" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M33 8C36 8 39 9 42 10" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M33 32C36 32 39 31 42 30" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - middle row */}
        <path d="M18 20C21 20 24 19 27 19" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M27 19C30 19 33 19 36 20" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M36 20C39 20 42 21 45 22" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - row 2 */}
        <path d="M18 16C21 15 24 14 27 14" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M27 14C30 14 33 14 36 15" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M36 15C39 15 42 16 45 17" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - row 3 */}
        <path d="M18 24C21 25 24 26 27 26" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M27 26C30 26 33 26 36 25" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M36 25C39 25 42 24 45 23" stroke="#FF3C62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        
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
          <path d="M50 20C50 20 57 23 58 26C52 25 46 22 44 22C44 22 47 18 50 20Z" fill="#7A2E8E" strokeWidth="1" stroke="#7A2E8E" />
        ) : (
          <path d="M50 20C50 20 47 23 44 23C44 23 47 17 50 20Z" fill="#7A2E8E" strokeWidth="1" stroke="#7A2E8E" />
        )}
      </svg>
    </div>
  );
};

export default Fish;
