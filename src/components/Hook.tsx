
import React from 'react';
import { Angry } from 'lucide-react';

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
      
      {/* Hook with mean worm visual */}
      <div className="relative flex flex-col items-center">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hook */}
          <path d="M20 0V15C20 22 10 27 0 22" stroke="#888888" strokeWidth="3" fill="none" />
        </svg>
        
        {/* Mean worm with challenge text directly on it */}
        <div className="relative -mt-2 flex flex-col items-center">
          <div className="relative">
            {/* Mean worm */}
            <div className="relative">
              <Angry className="text-pink-500 h-14 w-14 stroke-[3]" />
              
              {/* Eyes for mean look */}
              <div className="absolute top-[15%] left-[30%] w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="absolute top-[15%] right-[30%] w-2 h-2 bg-red-600 rounded-full"></div>
              
              {/* Sharp teeth */}
              <div className="absolute top-[30%] left-[40%] right-[40%] flex justify-between">
                <div className="w-1 h-2 bg-white transform rotate-[-15deg]"></div>
                <div className="w-1 h-2 bg-white"></div>
                <div className="w-1 h-2 bg-white transform rotate-[15deg]"></div>
              </div>
            </div>
            
            {/* Challenge text directly on the worm */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
              <p className="text-xs font-extrabold text-white whitespace-nowrap px-1 py-0.5 text-stroke-sm">
                {challenge}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hook;
