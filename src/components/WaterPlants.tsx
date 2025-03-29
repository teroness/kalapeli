
import React, { useState, useEffect } from 'react';
import { GameSize, PlantObject } from '@/types/gameTypes';
import { WATER_PLANTS } from '@/constants/gameConstants';

interface WaterPlantsProps {
  gameSize: GameSize;
  fishX?: number;
}

const WaterPlants: React.FC<WaterPlantsProps> = ({ gameSize, fishX = 0 }) => {
  const [plants, setPlants] = useState<PlantObject[]>(WATER_PLANTS);
  
  // Move plants from right to left
  useEffect(() => {
    if (!gameSize.width) return;
    
    const movePlants = setInterval(() => {
      setPlants(prevPlants => 
        prevPlants.map(plant => ({
          ...plant,
          x: plant.x <= -50 ? gameSize.width + 20 : plant.x - 0.5,
        }))
      );
    }, 50);
    
    return () => clearInterval(movePlants);
  }, [gameSize.width]);

  const renderPlant = (plant: PlantObject, index: number) => {
    const adjustedX = (plant.x / 1000) * gameSize.width;
    const distanceToFish = Math.abs(adjustedX - fishX);
    
    // Create a subtle sway effect based on distance to fish
    const swayOffset = distanceToFish < 150 ? Math.sin(Date.now() / 1000 + index) * (10 - distanceToFish / 20) : 0;
    
    const swayStyle = {
      transform: `translateX(${swayOffset}px)`,
      transition: 'transform 0.3s ease-in-out',
    };
    
    if (plant.type === 'seaweed') {
      return (
        <div 
          key={`plant-${index}`}
          className="absolute bottom-0"
          style={{ 
            left: `${adjustedX}px`,
            height: `${plant.height}px`,
            width: '30px',
            zIndex: 1,
            animation: `swim 4s ease-in-out infinite`,
            animationDelay: plant.animationDelay,
            ...swayStyle
          }}
        >
          <svg viewBox="0 0 30 120" width="30" height={plant.height} xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M15 0 C20 20, 5 40, 15 60 C25 80, 10 100, 15 120" 
              stroke={plant.color} 
              strokeWidth="3" 
              fill="none" 
            />
            <path 
              d="M15 0 C10 20, 25 40, 15 60 C5 80, 20 100, 15 120" 
              stroke={plant.color} 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="3,3"
            />
            <path 
              d="M15 30 C18 35, 22 37, 25 35" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M15 50 C12 55, 8 57, 5 55" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M15 70 C18 75, 22 77, 25 75" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M15 90 C12 95, 8 97, 5 95" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <circle cx="15" cy="40" r="2" fill={plant.color} fillOpacity="0.6" />
            <circle cx="15" cy="80" r="2" fill={plant.color} fillOpacity="0.6" />
          </svg>
        </div>
      );
    } else if (plant.type === 'coral') {
      return (
        <div 
          key={`plant-${index}`}
          className="absolute bottom-0"
          style={{ 
            left: `${adjustedX}px`,
            height: `${plant.height}px`,
            width: '40px',
            zIndex: 1,
            animation: `sway 5s ease-in-out infinite`,
            animationDelay: plant.animationDelay,
            ...swayStyle
          }}
        >
          <svg viewBox="0 0 40 80" width="40" height={plant.height} xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20 0 C30 10, 40 20, 35 40 C25 60, 15 50, 20 80 M20 0 C10 10, 0 20, 5 40 C15 60, 25 50, 20 80" 
              stroke={plant.color} 
              strokeWidth="4" 
              fill={plant.color} 
              fillOpacity="0.3" 
            />
            <path 
              d="M20 15 C25 20, 30 22, 28 30" 
              stroke={plant.color} 
              strokeWidth="3" 
              fill="none" 
            />
            <path 
              d="M20 15 C15 20, 10 22, 12 30" 
              stroke={plant.color} 
              strokeWidth="3" 
              fill="none" 
            />
            <circle cx="20" cy="55" r="3" fill={plant.color} fillOpacity="0.6" />
            <circle cx="25" cy="45" r="2" fill={plant.color} fillOpacity="0.6" />
            <circle cx="15" cy="45" r="2" fill={plant.color} fillOpacity="0.6" />
            <circle cx="22" cy="65" r="2" fill={plant.color} fillOpacity="0.7" />
            <circle cx="18" cy="65" r="2" fill={plant.color} fillOpacity="0.7" />
            <circle cx="20" cy="35" r="3" fill={plant.color} fillOpacity="0.5" />
          </svg>
        </div>
      );
    } else if (plant.type === 'waterlily') {
      const width = plant.width || 60;
      const swayRotation = distanceToFish < 100 ? Math.sin(Date.now() / 800 + index) * 3 : 0;
      
      return (
        <div 
          key={`plant-${index}`}
          className="absolute bottom-0"
          style={{ 
            left: `${adjustedX}px`,
            width: `${width}px`,
            height: `${width * 0.5}px`,
            zIndex: 1,
            animation: `swim 6s ease-in-out infinite`,
            animationDelay: plant.animationDelay,
            transform: `translateX(${swayOffset}px) rotate(${swayRotation}deg)`,
            transition: 'transform 0.4s ease-in-out'
          }}
        >
          <svg viewBox="0 0 60 30" width={width} height={width * 0.5} xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="15" rx="28" ry="14" fill={plant.color} fillOpacity="0.7" />
            <ellipse cx="30" cy="15" rx="20" ry="10" fill="#FFFFFF" fillOpacity="0.3" />
            <path 
              d="M10 15 C13 12, 16 10, 30 10 C44 10, 47 12, 50 15" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M10 15 C13 18, 16 20, 30 20 C44 20, 47 18, 50 15" 
              stroke={plant.color} 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M20 15 C23 13, 26 12, 30 12 C34 12, 37 13, 40 15" 
              stroke={plant.color} 
              strokeWidth="1.5" 
              fill="none" 
            />
            <path 
              d="M20 15 C23 17, 26 18, 30 18 C34 18, 37 17, 40 15" 
              stroke={plant.color} 
              strokeWidth="1.5" 
              fill="none" 
            />
            <circle cx="30" cy="15" r="4" fill={plant.color} fillOpacity="0.8" />
            <circle cx="25" cy="15" r="1" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="35" cy="15" r="1" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="30" cy="10" r="1" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="30" cy="20" r="1" fill="#FFFFFF" fillOpacity="0.8" />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {plants.map((plant, index) => renderPlant(plant, index))}
    </>
  );
};

export default WaterPlants;
