
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
        {/* Piranha body - more angular and aggressive */}
        <path d="M10 20C10 15 15 5 35 5C50 5 60 15 60 20C60 25 50 35 35 35C15 35 10 25 10 20Z" fill="#FF5A79" />
        
        {/* Piranha tail - sharper */}
        <path d="M10 20C10 20 0 10 0 5C0 10 0 30 0 35C5 30 10 20 10 20Z" fill="#7A2E8E" />
        
        {/* Piranha teeth - sharp and visible */}
        <path d="M35 5C35 5 40 9 45 9C50 9 55 5 55 5" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M35 35C35 35 40 31 45 31C50 31 55 35 55 35" stroke="white" strokeWidth="1.5" fill="none" />
        
        {/* Piranha eye - menacing */}
        <circle cx="45" cy="15" r="5" fill="#051C44" />
        <circle cx="47" cy="13" r="2" fill="white" />
        
        {/* Piranha fins - sharper and more aggressive */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#7A2E8E" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#7A2E8E" />
        
        {/* Gills */}
        <path d="M35 15C35 15 40 15 40 20C40 25 35 25 35 25" stroke="#7A2E8E" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
};

export default Fish;
