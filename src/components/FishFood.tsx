
import React from 'react';

interface FishFoodProps {
  id: number;
  position: { x: number; y: number };
  color: string;
}

const FishFood: React.FC<FishFoodProps> = ({ position, color }) => {
  return (
    <div 
      className="absolute transition-all" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {/* Teardrop shape with pointed end facing right */}
        <path 
          d="M10 18C10 18 17 12 17 7C17 3.1 13.9 0 10 0C6.1 0 3 3.1 3 7C3 12 10 18 10 18Z" 
          fill={color} 
          transform="rotate(90 10 10)"
        />
        
        {/* Small highlight to make it look shiny */}
        <path 
          d="M13 10C13 10 12 12 10 11C8 10 9 7 10 7C11 7 13 8 13 10Z" 
          fill="white" 
          fillOpacity="0.3" 
          transform="rotate(90 10 10)"
        />
      </svg>
    </div>
  );
};

export default FishFood;
