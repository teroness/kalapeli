
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
        width: '24px',
        height: '24px',
        zIndex: 5
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* Improved food shape with better visibility */}
        <path 
          d="M3 12C3 7 6 3 12 3C18 3 21 8 21 12C21 16 18 21 12 21C6 21 3 17 3 12Z" 
          fill={color}
          className="animate-pulse" 
        />
        
        {/* Enhanced highlight for better visibility */}
        <path 
          d="M7 10C7 12 9 14 11 13C13 12 13 8 11 8C9 8 7 9 7 10Z" 
          fill="white" 
          fillOpacity="0.7" 
        />
        
        {/* Additional detail for more visibility */}
        <circle cx="12" cy="12" r="4" fill={color} fillOpacity="0.8" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

export default FishFood;
