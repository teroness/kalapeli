
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
      
      {/* Hook with worm visual */}
      <div className="relative flex flex-col items-center">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hook */}
          <path d="M20 0V15C20 22 10 27 0 22" stroke="#888888" strokeWidth="3" fill="none" />
        </svg>
        
        {/* Animated worm with challenge text */}
        <div className="relative -mt-2 flex flex-col items-center">
          <div className="relative animate-[wiggle_2s_ease-in-out_infinite]">
            {/* Worm body - Earthworm appearance */}
            <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" className="animate-wiggle">
              {/* Main worm body - earthworm appearance */}
              <path d="M10 28C10 20 15 14 28 14C41 14 46 20 46 28C46 36 41 42 28 42C15 42 10 36 10 28Z" fill="#a57164" />
              
              {/* Worm segments - inner section */}
              <path d="M14 28C14 24 17 20 28 20C39 20 42 24 42 28C42 32 39 36 28 36C17 36 14 32 14 28Z" fill="#c58778" />
              
              {/* Segment lines to show worm texture */}
              <path d="M14 24C16 26 20 27 28 27C36 27 40 26 42 24" stroke="#986757" strokeWidth="1.5" fill="none" />
              <path d="M14 32C16 30 20 29 28 29C36 29 40 30 42 32" stroke="#986757" strokeWidth="1.5" fill="none" />
              <path d="M18 28C20 28 24 28 28 28C32 28 36 28 38 28" stroke="#986757" strokeWidth="1.5" fill="none" />
              
              {/* Worm rings - classic earthworm segments */}
              <path d="M13 22C15 23 18 24 28 24C38 24 41 23 43 22" stroke="#986757" strokeWidth="1" fill="none" />
              <path d="M13 26C15 27 18 28 28 28C38 28 41 27 43 26" stroke="#986757" strokeWidth="1" fill="none" />
              <path d="M13 30C15 31 18 32 28 32C38 32 41 31 43 30" stroke="#986757" strokeWidth="1" fill="none" />
              <path d="M13 34C15 35 18 36 28 36C38 36 41 35 43 34" stroke="#986757" strokeWidth="1" fill="none" />
              
              {/* Worm head details */}
              <circle cx="38" cy="24" r="2" fill="#5E4A41" /> {/* Left eye spot */}
              <circle cx="38" cy="32" r="2" fill="#5E4A41" /> {/* Right eye spot */}
              
              {/* Slime effect */}
              <path d="M10 28C10 28 9 32 8 34" stroke="#BE8578" strokeWidth="1.5" fill="none" />
              <path d="M10 28C10 28 8 26 7 24" stroke="#BE8578" strokeWidth="1.5" fill="none" />
            </svg>
            
            {/* Challenge text on the worm */}
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
