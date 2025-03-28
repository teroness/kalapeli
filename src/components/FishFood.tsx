
import React from 'react';

interface FishFoodProps {
  id: number;
  position: { x: number; y: number };
  color: string;
}

const FishFood: React.FC<FishFoodProps> = ({ position, color }) => {
  return (
    <div 
      className="absolute transition-opacity" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {/* Fish food pellet - using the color from props */}
        <circle cx="10" cy="10" r="8" fill={color} />
        
        {/* Highlight to make it look 3D */}
        <circle cx="7" cy="7" r="3" fill="white" fillOpacity="0.3" />
      </svg>
    </div>
  );
};

export default FishFood;
