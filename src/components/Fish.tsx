
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
        
        {/* Piranha teeth - sharper but still cute */}
        <path d="M50 15L53 10L56 15" stroke="white" strokeWidth="2" fill="white" />
        <path d="M50 25L53 30L56 25" stroke="white" strokeWidth="2" fill="white" />
        
        {/* Piranha eye - using the light color from the theme */}
        <circle cx="45" cy="17" r="6" fill="white" />
        <circle cx="45" cy="17" r="3" fill="#051C44" />
        <circle cx="43" cy="15" r="1.5" fill="white" />
        
        {/* Piranha fins - using the purple color from the theme */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#7A2E8E" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#7A2E8E" />
        
        {/* Cheek blush using orange from theme */}
        <circle cx="35" cy="20" r="4" fill="#FF9800" opacity="0.7" />
        
        {/* Cute smile */}
        <path d="M48 22C48 22 45 26 42 25" stroke="#7A2E8E" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
};

export default Fish;
