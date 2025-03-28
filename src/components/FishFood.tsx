
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
        width: '40px',  // Increased size from 30px to 40px
        height: '40px', // Increased size from 30px to 40px
        zIndex: 5
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        {/* Improved food shape with even better visibility */}
        <path 
          d="M5 20C5 10 10 5 20 5C30 5 35 12 35 20C35 28 30 35 20 35C10 35 5 30 5 20Z" 
          fill={color}
          stroke="white"
          strokeWidth="2"
          className="animate-pulse" 
        />
        
        {/* Enhanced highlight for better visibility */}
        <path 
          d="M12 16C12 19 15 22 19 21C23 20 23 13 19 13C15 13 12 15 12 16Z" 
          fill="white" 
          fillOpacity="0.7" 
        />
        
        {/* Additional detail for more visibility */}
        <circle cx="20" cy="20" r="7" fill={color} fillOpacity="0.8" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default FishFood;
