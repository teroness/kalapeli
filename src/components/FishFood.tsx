
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
        {/* Teardrop/drop shaped fish food using the color from props */}
        <path 
          d="M10 2C10 2 3 8 3 13C3 16.9 6.1 20 10 20C13.9 20 17 16.9 17 13C17 8 10 2 10 2Z" 
          fill={color} 
        />
        
        {/* Small highlight to make it look shiny */}
        <path 
          d="M7 10C7 10 8 8 10 9C12 10 11 13 10 13C9 13 7 12 7 10Z" 
          fill="white" 
          fillOpacity="0.3" 
        />
      </svg>
    </div>
  );
};

export default FishFood;
