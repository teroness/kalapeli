
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
        {/* Teardrop shape with asymmetric curve matching the reference image */}
        <path 
          d="M10 18C10 18 18 12 17 7C16 3 13 0 10 0C6 0 3 3 3 7C3 12 10 18 10 18Z" 
          fill={color} 
          transform="rotate(90 10 10)"
        />
        
        {/* Small highlight to make it look shiny */}
        <path 
          d="M13 9C13 10 12 12 10 11C9 10 9 7 10 7C11 7 13 8 13 9Z" 
          fill="white" 
          fillOpacity="0.4" 
          transform="rotate(90 10 10)"
        />
      </svg>
    </div>
  );
};

export default FishFood;
