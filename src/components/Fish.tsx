
import React from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
}

const Fish: React.FC<FishProps> = ({ position, direction }) => {
  // Create a teardrop-shaped fish with pink and purple colors from the image
  return (
    <div className="absolute transform transition-transform duration-100" 
         style={{ 
           left: `${position.x}px`, 
           top: `${position.y}px`,
           transform: `scaleX(${direction === 'right' ? 1 : -1})`,
         }}>
      <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        {/* Fish teardrop body - pink */}
        <path d="M10 20C10 10 20 5 35 5C50 5 60 15 60 20C60 25 50 35 35 35C20 35 10 30 10 20Z" fill="#FF5A79" />
        
        {/* Fish tail - purple */}
        <path d="M10 20C10 20 0 10 0 5C2 10 2 30 0 35C5 30 10 20 10 20Z" fill="#7A2E8E" />
        
        {/* Fish eye */}
        <circle cx="45" cy="15" r="5" fill="#051C44" />
        <circle cx="47" cy="13" r="2" fill="white" />
        
        {/* Fish fins */}
        <path d="M30 5C30 5 35 0 40 3C35 5 30 5 30 5Z" fill="#7A2E8E" />
        <path d="M30 35C30 35 35 40 40 37C35 35 30 35 30 35Z" fill="#7A2E8E" />
      </svg>
    </div>
  );
};

export default Fish;
