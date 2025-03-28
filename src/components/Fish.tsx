
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
        {/* Piranha body - rounder and cuter */}
        <path d="M10 20C10 15 15 5 35 5C50 5 58 12 58 20C58 28 50 35 35 35C15 35 10 25 10 20Z" fill="#FFDEE2" />
        
        {/* Piranha tail - slightly rounded */}
        <path d="M10 20C10 20 0 10 0 5C0 10 0 30 0 35C5 30 10 20 10 20Z" fill="#FDE1D3" />
        
        {/* Piranha teeth - smaller and cuter */}
        <path d="M40 8C40 8 43 10 45 10C47 10 50 8 50 8" stroke="white" strokeWidth="1" fill="none" />
        <path d="M40 32C40 32 43 30 45 30C47 30 50 32 50 32" stroke="white" strokeWidth="1" fill="none" />
        
        {/* Piranha eye - bigger and cuter */}
        <circle cx="45" cy="17" r="6" fill="#D3E4FD" />
        <circle cx="45" cy="17" r="3" fill="#051C44" />
        <circle cx="43" cy="15" r="1.5" fill="white" />
        
        {/* Piranha fins - softer and rounder */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#FDE1D3" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#FDE1D3" />
        
        {/* Cheek blush */}
        <circle cx="35" cy="20" r="4" fill="#FFDEE2" stroke="#FFB6C1" strokeWidth="1.5" />
        
        {/* Smile */}
        <path d="M50 22C50 22 47 26 43 25" stroke="#7A2E8E" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
};

export default Fish;
