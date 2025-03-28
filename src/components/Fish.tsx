
import React from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
  size?: number;
}

const Fish: React.FC<FishProps> = ({ position, direction, size = 1 }) => {
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
        
        {/* Piranha scales - adding more detailed scale pattern */}
        <path d="M15 15C17 13 20 12 20 12" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M15 25C17 27 20 28 20 28" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M20 10C22 9 25 8 25 8" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M20 30C22 31 25 32 25 32" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M25 8C28 7 30 7 30 7" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M25 32C28 33 30 33 30 33" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M30 7C33 7 35 8 35 8" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M30 33C33 33 35 32 35 32" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M35 8C38 9 40 10 40 10" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M35 32C38 31 40 30 40 30" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M40 10C42 12 45 15 45 15" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M40 30C42 28 45 25 45 25" stroke="#FF3C62" strokeWidth="1" fill="none" />
        
        {/* Additional diagonal scales for more detail */}
        <path d="M18 17C20 15 22 14 22 14" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M18 23C20 25 22 26 22 26" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M28 10C30 9 32 8 32 8" stroke="#FF3C62" strokeWidth="1" fill="none" />
        <path d="M28 30C30 31 32 32 32 32" stroke="#FF3C62" strokeWidth="1" fill="none" />
        
        {/* Piranha eye - using the light color from the theme */}
        <circle cx="45" cy="17" r="6" fill="white" />
        <circle cx="45" cy="17" r="3" fill="#051C44" />
        <circle cx="43" cy="15" r="1.5" fill="white" />
        
        {/* Piranha fins - using the purple color from the theme */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#7A2E8E" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#7A2E8E" />
        
        {/* Cheek blush using orange from theme */}
        <circle cx="35" cy="20" r="4" fill="#FF9800" opacity="0.7" />
        
        {/* Improved mouth shape - slightly open with a curve */}
        <path d="M50 20C50 20 47 23 44 23C44 23 47 17 50 20Z" fill="#7A2E8E" strokeWidth="1" stroke="#7A2E8E" />
      </svg>
    </div>
  );
};

export default Fish;
