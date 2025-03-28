
import React from 'react';

interface FishFoodProps {
  id: number;
  position: { x: number; y: number };
  color: string;
}

const FishFood: React.FC<FishFoodProps> = ({ position, color }) => {
  return (
    <div 
      className="absolute transition-all animate-pulse" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {/* Improved food shape - more detailed and with shine */}
        <path 
          d="M3 10C3 6 5 3 10 3C15 3 17 7 17 10C17 13 15 17 10 17C5 17 3 14 3 10Z" 
          fill={color} 
        />
        
        {/* Small highlight to make it look shiny */}
        <path 
          d="M6 9C6 10 7 12 9 11C10 10 10 7 9 7C8 7 6 8 6 9Z" 
          fill="white" 
          fillOpacity="0.4" 
        />
      </svg>
    </div>
  );
};

export default FishFood;
