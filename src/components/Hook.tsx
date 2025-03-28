
import React from 'react';

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
      
      {/* Hook with challenge price tag */}
      <div className="relative">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hook */}
          <path d="M20 0V15C20 22 10 27 0 22" stroke="#888888" strokeWidth="3" fill="none" />
        </svg>
        
        {/* Price tag with challenge text */}
        <div className="absolute -bottom-2 -left-20">
          {/* Price tag with string */}
          <div className="relative">
            {/* String connecting to hook */}
            <div className="absolute top-0 right-2 w-px h-7 bg-red-500 rotate-12"></div>
            
            {/* Price tag body */}
            <div className="bg-white rounded-md border-2 border-red-500 px-2 py-1 mt-6 shadow-md w-36 animate-[sway_3s_ease-in-out_infinite]">
              <p className="text-xs font-extrabold text-red-600 whitespace-nowrap text-center">
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
