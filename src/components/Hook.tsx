
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
            {/* Worm body */}
            <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" className="animate-wiggle">
              {/* Main worm body - segmented appearance */}
              <path d="M10 28C10 20 15 14 28 14C41 14 46 20 46 28C46 36 41 42 28 42C15 42 10 36 10 28Z" fill="#F97316" />
              
              {/* Worm segments - inner section */}
              <path d="M14 28C14 24 17 20 28 20C39 20 42 24 42 28C42 32 39 36 28 36C17 36 14 32 14 28Z" fill="#FF5A79" />
              
              {/* Segment lines to show worm texture */}
              <path d="M14 24C16 26 20 27 28 27C36 27 40 26 42 24" stroke="#F97316" strokeWidth="1.5" fill="none" />
              <path d="M14 32C16 30 20 29 28 29C36 29 40 30 42 32" stroke="#F97316" strokeWidth="1.5" fill="none" />
              
              {/* Worm face */}
              <circle cx="38" cy="24" r="4" fill="white" /> {/* Left eye */}
              <circle cx="38" cy="24" r="2" fill="black" /> {/* Left pupil */}
              <circle cx="38" cy="32" r="4" fill="white" /> {/* Right eye */}
              <circle cx="38" cy="32" r="2" fill="black" /> {/* Right pupil */}
              
              {/* Angry eyebrows */}
              <path d="M34 22L40 20" stroke="black" strokeWidth="2" />
              <path d="M34 34L40 36" stroke="black" strokeWidth="2" />
              
              {/* Mean mouth with sharp teeth */}
              <path d="M42 28C42 28 44 26 44 28C44 30 42 28 42 28Z" fill="white" /> {/* Top tooth */}
              <path d="M42 28C42 28 44 30 44 28C44 26 42 28 42 28Z" fill="white" /> {/* Bottom tooth */}
              
              {/* Small slime drip */}
              <path d="M10 28C10 28 9 32 8 34" stroke="#F97316" strokeWidth="1.5" fill="none" />
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
