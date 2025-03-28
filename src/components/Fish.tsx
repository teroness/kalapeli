
import React from 'react';

interface FishProps {
  position: { x: number; y: number };
  direction: 'left' | 'right';
  size?: number;
  isEating?: boolean;
  isGrowing?: boolean;
}

const Fish: React.FC<FishProps> = ({ 
  position, 
  direction, 
  size = 1, 
  isEating = false,
  isGrowing = false
}) => {
  return (
    <div 
      className={`absolute transition-transform duration-100 ${
        isGrowing ? 'animate-grow' : 'animate-swim'
      }`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `scaleX(${direction === 'right' ? 1 : -1}) scale(${size})`,
        zIndex: 10
      }}>
      <svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        {/* Piranha body - using the pink color from the theme */}
        <path d="M10 20C10 15 15 5 35 5C50 5 58 12 58 20C58 28 50 35 35 35C15 35 10 25 10 20Z" fill="#FF5A79" />
        
        {/* Piranha tail - using teal instead of navy */}
        <path d="M10 20C10 20 0 10 0 5C0 10 0 30 0 35C5 30 10 20 10 20Z" fill="#20B2AA" />
        
        {/* Top fin - orange from the image */}
        <path d="M25 5C25 5 30 0 35 2C30 6 25 5 25 5Z" fill="#FF9800" />
        
        {/* Bottom fin - orange */}
        <path d="M25 35C25 35 30 40 35 38C30 34 25 35 25 35Z" fill="#FF9800" />
        
        {/* Side fin - top (violet from the image) */}
        <path d="M20 12C20 12 15 8 18 5C22 8 20 12 20 12Z" fill="#7A2E8E" />
        
        {/* Side fin - bottom (violet from the image) */}
        <path d="M20 28C20 28 15 32 18 35C22 32 20 28 20 28Z" fill="#7A2E8E" />
        
        {/* Additional side fin - middle (violet) */}
        <path d="M22 20C22 20 16 18 16 16C20 18 22 20 22 20Z" fill="#7A2E8E" />
        
        {/* Improved piranha scales - more defined pattern with teal accents */}
        <path d="M18 12C20 11 22 10 24 10" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M18 28C20 29 22 30 24 30" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M24 10C27 9 30 8 33 8" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M24 30C27 31 30 32 33 32" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M33 8C36 8 39 9 42 10" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M33 32C36 32 39 31 42 30" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - middle row */}
        <path d="M18 20C21 20 24 19 27 19" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M27 19C30 19 33 19 36 20" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M36 20C39 20 42 21 45 22" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - row 2 */}
        <path d="M18 16C21 15 24 14 27 14" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M27 14C30 14 33 14 36 15" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M36 15C39 15 42 16 45 17" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Additional diagonal scales - row 3 */}
        <path d="M18 24C21 25 24 26 27 26" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M27 26C30 26 33 26 36 25" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M36 25C39 25 42 24 45 23" stroke="#20B2AA" strokeWidth="1" strokeLinecap="round" fill="none" />
        
        {/* Piranha eye - black with white highlight */}
        <circle cx="45" cy="17" r="6" fill="white" />
        <circle cx="45" cy="17" r="3" fill="black" />
        <circle cx="43" cy="15" r="1.5" fill="white" />
        
        {/* Cheek accent using violet from the image */}
        <circle cx="35" cy="20" r="4" fill="#7A2E8E" opacity="0.7" />
        
        {/* Mouth shape - with animation for eating */}
        {isEating ? (
          // Very wide-open mouth when eating - dramatically enhanced
          <path 
            d="M50 20C50 20 60 12 60 20C60 28 50 28 46 23C44 20 42 23 42 23C42 23 46 16 50 20Z" 
            fill="#FF3C62" 
            strokeWidth="1.5" 
            stroke="#FF3C62"
          />
        ) : (
          // Normal mouth when not eating
          <path d="M50 20C50 20 47 23 44 23C44 23 47 17 50 20Z" fill="#FF3C62" strokeWidth="1" stroke="#FF3C62" />
        )}
      </svg>
    </div>
  );
};

export default Fish;
