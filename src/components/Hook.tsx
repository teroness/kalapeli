
import React from 'react';
import { Worm } from 'lucide-react';

interface HookProps {
  position: { x: number, y: number };
  challenge: string;
  speed: number;
}

const Hook: React.FC<HookProps> = ({ position, challenge, speed }) => {
  return (
    <div 
      className="challenge-hook flex flex-col items-center justify-center absolute" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: `left ${speed}ms linear`
      }}
    >
      {/* Fishing line */}
      <div className="h-16 w-1 bg-gray-300 opacity-70"></div>
      
      {/* Hook with worm visual */}
      <div className="relative flex flex-col items-center">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hook */}
          <path d="M20 0V15C20 22 10 27 0 22" stroke="#888888" strokeWidth="3" fill="none" />
        </svg>
        
        {/* Worm with challenge - made bolder */}
        <div className="relative -mt-2 flex flex-col items-center">
          <Worm className="text-pink-400 h-12 w-12 stroke-[2.5]" /> {/* Increased size and stroke width */}
          
          {/* Challenge text - wider to fit all text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-xs text-center font-bold text-gameColors-navy max-w-[80px] min-w-[60px] shadow-sm whitespace-nowrap overflow-visible">
            {challenge}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hook;
