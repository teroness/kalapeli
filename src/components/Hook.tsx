
import React from 'react';
import { Tag } from 'lucide-react';

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
      <div className="h-16 w-1 bg-gray-400"></div>
      
      {/* Hook with challenge price tag */}
      <div className="relative">
        {/* Improved hook shape */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0V15C20 22 9 30 2 24" stroke="#666666" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
        
        {/* Price tag with challenge text - now properly attached to hook */}
        <div className="absolute -bottom-5 -left-16 transform -rotate-12">
          {/* String connecting to hook */}
          <div className="absolute top-0 right-1 w-1 h-4 bg-red-500 rotate-12"></div>
          
          {/* Price tag body - looks like the hook pierces through it */}
          <div className="bg-white rounded-md border-2 border-red-500 px-2 py-1 shadow-md w-32 relative">
            {/* The hole where hook goes through */}
            <div className="absolute -top-1 right-1 w-2 h-2 rounded-full border border-red-300"></div>
            
            <p className="text-xs font-extrabold text-red-600 whitespace-nowrap text-center">
              {challenge}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hook;
