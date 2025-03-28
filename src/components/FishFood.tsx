
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
      className={`absolute transition-all ${isEaten ? 'opacity-50 scale-75' : 'animate-wiggle'}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        pointerEvents: isEaten ? 'none' : 'auto',
        transitionDuration: '300ms',
        width: '25px',  // Increased from 15px to 25px
        height: '25px', // Increased from 15px to 25px
        zIndex: 5
      }}
    >
      <svg width="25" height="25" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        {/* Food shape */}
        <path 
          d="M5 20C5 10 10 5 20 5C30 5 35 12 35 20C35 28 30 35 20 35C10 35 5 30 5 20Z" 
          fill={isEaten ? `${color}80` : color}
          className={isEaten ? '' : 'animate-pulse'} 
        />
        
        {/* Highlight */}
        <path 
          d="M12 16C12 19 15 22 19 21C23 20 23 13 19 13C15 13 12 15 12 16Z" 
          fill="white" 
          fillOpacity={isEaten ? "0.3" : "0.5"} 
        />
        
        {/* Central circle */}
        <circle cx="20" cy="20" r="7" fill={isEaten ? `${color}60` : color} fillOpacity={isEaten ? "0.5" : "0.8"} />
      </svg>
    </div>
  );
};

export default FishFood;
