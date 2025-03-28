
import React from 'react';

interface NetProps {
  position: { x: number, y: number };
  challenge: string;
  speed: number;
}

const Net: React.FC<NetProps> = ({ position, challenge, speed }) => {
  return (
    <div 
      className="challenge-net flex flex-col items-center justify-center" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: `left ${speed}ms linear`
      }}
    >
      {/* Net visual */}
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20C10 20 40 10 90 20V90C90 90 60 80 10 90V20Z" stroke="#051C44" strokeWidth="3" fill="rgba(13, 43, 91, 0.2)" />
          
          {/* Vertical lines */}
          <line x1="20" y1="20" x2="20" y2="90" stroke="#051C44" strokeWidth="1" />
          <line x1="35" y1="20" x2="35" y2="90" stroke="#051C44" strokeWidth="1" />
          <line x1="50" y1="20" x2="50" y2="90" stroke="#051C44" strokeWidth="1" />
          <line x1="65" y1="20" x2="65" y2="90" stroke="#051C44" strokeWidth="1" />
          <line x1="80" y1="20" x2="80" y2="90" stroke="#051C44" strokeWidth="1" />
          
          {/* Horizontal lines */}
          <line x1="10" y1="35" x2="90" y2="35" stroke="#051C44" strokeWidth="1" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="#051C44" strokeWidth="1" />
          <line x1="10" y1="65" x2="90" y2="65" stroke="#051C44" strokeWidth="1" />
          <line x1="10" y1="80" x2="90" y2="80" stroke="#051C44" strokeWidth="1" />
        </svg>
        
        {/* Challenge text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 p-1 rounded text-xs text-center max-w-[80px] font-medium text-gameColors-navy">
            {challenge}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Net;
