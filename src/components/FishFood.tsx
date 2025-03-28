
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
      className={`absolute transition-all ${isEaten ? 'animate-fade-out scale-0' : 'animate-wiggle'}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: isEaten ? 0 : 1,
        pointerEvents: isEaten ? 'none' : 'auto',
        transitionDuration: '300ms',
        width: '30px',
        height: '30px',
        zIndex: 5
      }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        {/* Improved food shape with even better visibility */}
        <path 
          d="M4 15C4 9 8 4 15 4C22 4 26 10 26 15C26 20 22 26 15 26C8 26 4 21 4 15Z" 
          fill={color}
          stroke="white"
          strokeWidth="1"
          className="animate-pulse" 
        />
        
        {/* Enhanced highlight for better visibility */}
        <path 
          d="M9 12C9 14 11 17 14 16C17 15 17 10 14 10C11 10 9 11 9 12Z" 
          fill="white" 
          fillOpacity="0.7" 
        />
        
        {/* Additional detail for more visibility */}
        <circle cx="15" cy="15" r="5" fill={color} fillOpacity="0.8" stroke="white" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export default FishFood;
