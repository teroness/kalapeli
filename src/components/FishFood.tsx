
import React from 'react';

interface FishFoodProps {
  id: number;
  position: { x: number; y: number };
  color: string;
  isEaten?: boolean;
}

const FishFood: React.FC<FishFoodProps> = ({ position, color, isEaten = false, id }) => {
  return (
    <div 
      data-id={id}
      className="absolute animate-wiggle" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '30px',
        height: '30px',
        zIndex: 5,
        pointerEvents: 'none' // Prevent any mouse interaction with food
      }}
    >
      <svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M5 20C5 10 10 5 20 5C30 5 35 12 35 20C35 28 30 35 20 35C10 35 5 30 5 20Z" 
          fill={color}
          className="animate-pulse" 
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        
        <path 
          d="M12 16C12 19 15 22 19 21C23 20 23 13 19 13C15 13 12 15 12 16Z" 
          fill="white" 
          fillOpacity="0.8" 
        />
        
        <circle cx="20" cy="20" r="10" fill={color} fillOpacity="1" />
      </svg>
    </div>
  );
};

export default FishFood;
