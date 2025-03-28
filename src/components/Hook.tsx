
import React from 'react';

interface HookProps {
  position: { x: number, y: number };
  challenge: string;
  speed: number;
}

const Hook: React.FC<HookProps> = ({ position, challenge, speed }) => {
  return (
    <div 
      className="challenge-hook flex flex-col items-center justify-center" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: `left ${speed}ms linear`
      }}
    >
      {/* Fishing line */}
      <div className="h-20 w-1 bg-gray-300 opacity-70"></div>
      
      {/* Hook visual */}
      <div className="relative">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hook */}
          <path d="M30 0V50C30 65 15 75 0 65" stroke="#888888" strokeWidth="3" fill="none" />
          
          {/* Challenge card */}
          <rect x="10" y="30" width="40" height="30" rx="4" fill="white" stroke="#051C44" strokeWidth="1" />
        </svg>
        
        {/* Challenge text */}
        <div className="absolute top-[40px] left-[10px] right-[10px]">
          <div className="bg-white p-1 rounded text-xs text-center max-w-[40px] font-medium text-gameColors-navy">
            {challenge}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hook;
