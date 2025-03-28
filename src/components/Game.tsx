import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Fish from '@/components/Fish';
import Hook from '@/components/Hook';
import FishFood from '@/components/FishFood';

const HEALTH_CHALLENGES = [
  "YT-neuvottelut",
  "Burnout",
  "Korona",
  "Palkkataso",
  "Henkilöstöpula",
  "Ylityöt",
  "Työvuorolistat",
  "Sijaisuudet",
  "Resurssipula",
  "Leikkaukset",
  "Työtaakka",
  "Kiire",
  "Stressi",
  "Väsymys",
  "Sisäilma",
  "Uupumus",
  "Jaksamishaaste",
  "Työnkierto",
  "Palkkakuilu",
  "Lomapula",
  "Vuorotyö",
  "Tehokkuusvaatimus",
  "Työuupumus",
  "Henkilöstövaje",
  "Kiusaaminen",
  "Muutosvastarinta",
  "Perehdytyspula",
  "Epäselvä johtaminen",
  "Kahvi loppu!",
  "Esihenkilö soitti",
  "Potilasvalitus",
  "Kämmenet kuivuu",
  "Tietojärjestelmä kaatui",
  "Potilastietojärjestelmän päivitys",
  "Somekohu",
  "Pahanhajuinen potilas",
  "Rikkinäinen tulostin",
  "Yövuoro peräkkäin",
  "Jatkuva puhelin",
  "Pakkosiirto",
  "Hissi rikki 8. kerrokseen",
  "Täysikuu",
  "Ruokatauolle ei ehtinyt",
  "Vessassa ei paperia",
  "Excel-taulukkomuutos",
  "Suojavarusteet loppu",
  "Sijainen ei tullut",
  "Omainen raivoaa",
  "Tuplakirjaaminen",
  "Lomalta soitto töihin",
  "Potilas karkasi",
  "Ohjelma vaihtuu",
  "Puolet töistä sairaana",
  "Tietokone jumissa"
];

const FOOD_COLORS = [
  "#FF5A79",
  "#7A2E8E",
  "#FF9800"
];

const WATER_PLANTS = [
  { x: 20, y: 400, type: 'seaweed', height: 140, color: '#2ECC71', animationDelay: '0s' },
  { x: 80, y: 390, type: 'seaweed', height: 120, color: '#3CB371', animationDelay: '0.3s' },
  { x: 120, y: 410, type: 'coral', height: 90, color: '#F39C12', animationDelay: '0.7s' },
  { x: 160, y: 430, type: 'seaweed', height: 150, color: '#27AE60', animationDelay: '0.2s' },
  { x: 200, y: 400, type: 'waterlily', width: 70, color: '#9ACD32', animationDelay: '0.5s' },
  { x: 250, y: 420, type: 'seaweed', height: 130, color: '#16A085', animationDelay: '0.9s' },
  { x: 290, y: 390, type: 'seaweed', height: 110, color: '#2ECC71', animationDelay: '0.4s' },
  { x: 330, y: 410, type: 'coral', height: 80, color: '#E67E22', animationDelay: '0.8s' },
  { x: 370, y: 430, type: 'waterlily', width: 60, color: '#66CDAA', animationDelay: '0.6s' },
  { x: 410, y: 400, type: 'seaweed', height: 160, color: '#27AE60', animationDelay: '0.2s' },
  { x: 450, y: 420, type: 'seaweed', height: 140, color: '#2ECC71', animationDelay: '0.7s' },
  { x: 490, y: 390, type: 'coral', height: 90, color: '#F39C12', animationDelay: '0.4s' },
  { x: 530, y: 410, type: 'waterlily', width: 65, color: '#66CDAA', animationDelay: '0.1s' },
  { x: 570, y: 430, type: 'seaweed', height: 130, color: '#27AE60', animationDelay: '0.5s' },
  { x: 610, y: 400, type: 'seaweed', height: 120, color: '#2ECC71', animationDelay: '0.3s' },
  { x: 650, y: 420, type: 'coral', height: 85, color: '#E67E22', animationDelay: '0.8s' },
  { x: 690, y: 390, type: 'waterlily', width: 70, color: '#9ACD32', animationDelay: '0.6s' },
  { x: 730, y: 410, type: 'seaweed', height: 150, color: '#16A085', animationDelay: '0.2s' },
  { x: 770, y: 430, type: 'seaweed', height: 130, color: '#2ECC71', animationDelay: '0.7s' },
  { x: 810, y: 400, type: 'coral', height: 95, color: '#F39C12', animationDelay: '0.5s' },
  { x: 850, y: 420, type: 'waterlily', width: 75, color: '#66CDAA', animationDelay: '0.3s' },
  { x: 890, y: 390, type: 'seaweed', height: 140, color: '#27AE60', animationDelay: '0.1s' },
  { x: 930, y: 410, type: 'seaweed', height: 120, color: '#2ECC71', animationDelay: '0.4s' },
  { x: 970, y: 430, type: 'coral', height: 90, color: '#E67E22', animationDelay: '0.6s' }
];

interface HookObject {
  id: number;
  position: { x: number; y: number };
  challenge: string;
  speed: number;
}

interface FoodObject {
  id: number;
  position: { x: number; y: number };
  color: string;
  isEaten: boolean;
}

const Game: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastHookTimeRef = useRef<number>(Date.now());
  const lastFoodTimeRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);
  
  const [gameSize, setGameSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 100, y: 200 });
  const [fishDirection, setFishDirection] = useState<'left' | 'right'>('right');
  const [hooks, setHooks] = useState<HookObject[]>([]);
  const [foods, setFoods] = useState<FoodObject[]>([]);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [difficulty, setDifficulty] = useState(1);
  const [foodCollected, setFoodCollected] = useState(0);
  const [fishSize, setFishSize] = useState(1);
  const [isEating, setIsEating] = useState(false);
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);
  
  useEffect(() => {
    const updateGameSize = () => {
      if (gameAreaRef.current) {
        setGameSize({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight
        });
        setFishPosition({
          x: gameAreaRef.current.clientWidth / 4,
          y: gameAreaRef.current.clientHeight / 2
        });
      }
    };

    updateGameSize();
    window.addEventListener('resize', updateGameSize);
    return () => window.removeEventListener('resize', updateGameSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
        setKeys(prevKeys => ({ ...prevKeys, [e.key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
        setKeys(prevKeys => ({ ...prevKeys, [e.key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const checkHookCollisions = useCallback(() => {
    const fishWidth = 60 * fishSize;
    const fishHeight = 40 * fishSize;
    
    for (const hook of hooks) {
      if (
        fishPosition.x + 10 < hook.position.x + 40 &&
        fishPosition.x + fishWidth - 10 > hook.position.x &&
        fishPosition.y + 5 < hook.position.y + 60 &&
        fishPosition.y + fishHeight - 5 > hook.position.y
      ) {
        setIsPlaying(false);
        setGameOver(true);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return true;
      }
    }
    return false;
  }, [fishPosition, hooks, fishSize]);

  const checkFoodCollisions = useCallback(() => {
    const fishWidth = 60 * fishSize;
    const fishHeight = 40 * fishSize;
    
    const fishMouthPosition = fishDirection === 'right' 
      ? { x: fishPosition.x + fishWidth * 0.85, y: fishPosition.y + fishHeight * 0.5 }
      : { x: fishPosition.x + fishWidth * 0.15, y: fishPosition.y + fishHeight * 0.5 };
    
    const mouthHitboxSize = 40 * fishSize;
    
    let foodEaten = false;
    
    setFoods(prevFoods => {
      const updatedFoods = prevFoods.map(food => {
        if (food.isEaten) return food;
        
        const distance = Math.sqrt(
          Math.pow(fishMouthPosition.x - food.position.x - 12, 2) + 
          Math.pow(fishMouthPosition.y - food.position.y - 12, 2)
        );
        
        console.log(`Food ${food.id} - Distance: ${distance.toFixed(2)}, Hitbox: ${mouthHitboxSize}, Position: ${food.position.x},${food.position.y}, Mouth: ${fishMouthPosition.x},${fishMouthPosition.y}`);
        
        if (distance < mouthHitboxSize) {
          foodEaten = true;
          console.log('FOOD EATEN!', distance, mouthHitboxSize);
          return { ...food, isEaten: true };
        }
        
        return food;
      });
      
      return updatedFoods;
    });
    
    if (foodEaten) {
      setIsEating(true);
      
      setScore(prevScore => prevScore + 10);
      setFoodCollected(prev => prev + 1);
      
      if ((foodCollected + 1) % 5 === 0 && fishSize < 1.5) {
        setFishSize(prevSize => {
          const newSize = Math.min(prevSize + 0.1, 1.5);
          setIsGrowing(true);
          setTimeout(() => setIsGrowing(false), 800);
          return newSize;
        });
      }
      
      setTimeout(() => {
        setIsEating(false);
        setFoods(prevFoods => prevFoods.filter(food => !food.isEaten));
      }, 800);
    }
    
    return foodEaten;
  }, [fishPosition, fishDirection, foodCollected, fishSize]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      frameCountRef.current += 1;
      
      const shouldProcessFrame = frameCountRef.current % 2 === 0;
      
      if (shouldProcessFrame) {
        setFishPosition(prevPos => {
          let newPos = { ...prevPos };
          const moveStep = 5;
          
          if (keys.ArrowUp) {
            newPos.y = Math.max(0, newPos.y - moveStep);
          }
          if (keys.ArrowDown) {
            newPos.y = Math.min(gameSize.height - 40 * fishSize, newPos.y + moveStep);
          }
          if (keys.ArrowLeft) {
            newPos.x = Math.max(0, newPos.x - moveStep);
            setFishDirection('left');
          }
          if (keys.ArrowRight) {
            newPos.x = Math.min(gameSize.width - 60 * fishSize, newPos.x + moveStep);
            setFishDirection('right');
          }
          
          return newPos;
        });
      }

      const now = Date.now();
      
      const hookSpawnInterval = Math.max(5000 - difficulty * 100, 3000);
      
      if (now - lastHookTimeRef.current > hookSpawnInterval) {
        let usedChallenges = hooks.map(h => h.challenge);
        let availableChallenges = HEALTH_CHALLENGES.filter(c => !usedChallenges.includes(c));
        
        const randomChallenge = availableChallenges.length > 0 
          ? availableChallenges[Math.floor(Math.random() * availableChallenges.length)]
          : HEALTH_CHALLENGES[Math.floor(Math.random() * HEALTH_CHALLENGES.length)];
          
        const randomY = Math.random() * (gameSize.height - 100);
        
        setHooks(prevHooks => [
          ...prevHooks,
          {
            id: now,
            position: { x: gameSize.width, y: randomY },
            challenge: randomChallenge,
            speed: 2 + difficulty * 0.5
          }
        ]);
        
        lastHookTimeRef.current = now;
      }

      const foodSpawnInterval = Math.max(1500 - difficulty * 50, 800);
      if (now - lastFoodTimeRef.current > foodSpawnInterval) {
        const randomColor = FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)];
        const randomY = Math.random() * (gameSize.height - 20);
        
        setFoods(prevFoods => [
          ...prevFoods,
          {
            id: now + 1,
            position: { x: gameSize.width, y: randomY },
            color: randomColor,
            isEaten: false
          }
        ]);
        
        lastFoodTimeRef.current = now;
      }

      if (shouldProcessFrame) {
        setHooks(prevHooks => prevHooks.map(hook => ({
          ...hook,
          position: { ...hook.position, x: hook.position.x - hook.speed }
        })).filter(hook => hook.position.x > -100));
        
        setFoods(prevFoods => prevFoods.map(food => ({
          ...food,
          position: { ...food.position, x: food.position.x - 3 }
        })).filter(food => food.position.x > -20 && !food.isEaten));
        
        const ateFoodThisFrame = checkFoodCollisions();
        
        if (!checkHookCollisions()) {
          setScore(prevScore => prevScore + 1);
          
          if (score > 0 && score % 500 === 0 && difficulty < 10) {
            setDifficulty(prevDifficulty => Math.min(prevDifficulty + 1, 10));
          }
        }
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [isPlaying, gameOver, keys, gameSize, checkHookCollisions, checkFoodCollisions, score, difficulty, fishSize, hooks.length, fishDirection, fishPosition]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setFoodCollected(0);
    setHooks([]);
    setFoods([]);
    setDifficulty(1);
    setFishSize(1);
    setFishPosition({
      x: gameSize.width / 4,
      y: gameSize.height / 2
    });
    frameCountRef.current = 0;
    lastHookTimeRef.current = Date.now();
    lastFoodTimeRef.current = Date.now();
    setIsGrowing(false);
  };

  const renderWaterPlants = () => {
    const plants = [];
    
    for (const plant of WATER_PLANTS) {
      const adjustedX = (plant.x / 1000) * gameSize.width;
      
      if (plant.type === 'seaweed') {
        plants.push(
          <div 
            key={`plant-${plant.x}-${plant.y}`}
            className="absolute bottom-0"
            style={{ 
              left: `${adjustedX}px`,
              height: `${plant.height}px`,
              width: '30px',
              zIndex: 1,
              animation: `swim 4s ease-in-out infinite`,
              animationDelay: plant.animationDelay
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
        plants.push(
          <div 
            key={`plant-${plant.x}-${plant.y}`}
            className="absolute bottom-0"
            style={{ 
              left: `${adjustedX}px`,
              height: `${plant.height}px`,
              width: '40px',
              zIndex: 1,
              animation: `sway 5s ease-in-out infinite`,
              animationDelay: plant.animationDelay
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
        plants.push(
          <div 
            key={`plant-${plant.x}-${plant.y}`}
            className="absolute bottom-0"
            style={{ 
              left: `${adjustedX}px`,
              width: `${width}px`,
              height: `${width * 0.5}px`,
              zIndex: 1,
              animation: `swim 6s ease-in-out infinite`,
              animationDelay: plant.animationDelay
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
    }
    
    return plants;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-4xl bg-white rounded-t-lg shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gameColors-navy text-xl">Pisteet:</span>
          <span className="text-xl text-gameColors-pink">{score}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gameColors-navy">Taso:</span>
            <span className="text-gameColors-purple font-bold">{difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gameColors-navy">Ruokaa kerätty:</span>
            <span className="text-gameColors-orange font-bold">{foodCollected}</span>
          </div>
        </div>
        <Button 
          onClick={startGame} 
          variant="default" 
          className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
          disabled={isPlaying}
        >
          {gameOver ? "Pelaa uudelleen" : isPlaying ? "Pelissä..." : "Aloita peli"}
        </Button>
      </div>
      
      <div 
        ref={gameAreaRef}
        className="w-full max-w-4xl h-[500px] water-background relative overflow-hidden rounded-b-lg shadow-md"
      >
        {renderWaterPlants()}
        
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
            <h2 className="text-3xl font-bold mb-6 text-gameColors-pink">Piranha-väistelypeli</h2>
            <p className="text-center mb-4 max-w-md">
              Ohjaa piraijaa vedessä, kerää pisaranmuotoista ruokaa kasvaaksesi ja väistä koukkuja, joissa on terveydenhuollon haasteita!
            </p>
            <div className="bg-white text-black p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2 text-gameColors-navy">Ohjeet:</h3>
              <p>Käytä nuolinäppäimiä liikuttaaksesi kalaa:</p>
              <div className="grid grid-cols-3 gap-1 my-2">
                <div></div>
                <div className="border border-gameColors-navy rounded p-1 text-center">▲</div>
                <div></div>
                <div className="border border-gameColors-navy rounded p-1 text-center">◄</div>
                <div className="border border-gameColors-navy rounded p-1 text-center">▼</div>
                <div className="border border-gameColors-navy rounded p-1 text-center">►</div>
              </div>
            </div>
            <Button 
              onClick={startGame} 
              variant="default" 
              className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
            >
              Aloita peli
            </Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
            <h2 className="text-3xl font-bold mb-4 text-gameColors-pink">Peli päättyi!</h2>
            <p className="text-2xl mb-2">Pisteesi: <span className="text-gameColors-pink font-bold">{score}</span></p>
            <p className="text-xl mb-6">Ruokaa kerätty: <span className="text-gameColors-orange font-bold">{foodCollected}</span></p>
            <Button 
              onClick={startGame} 
              variant="default" 
              className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
            >
              Pelaa uudelleen
            </Button>
          </div>
        )}
        
        {(isPlaying || gameOver) && (
          <>
            <Fish 
              position={fishPosition} 
              direction={fishDirection} 
              size={fishSize}
              isEating={isEating}
              isGrowing={isGrowing}
            />
            
            {isGrowing && (
              <div className="absolute text-yellow-300 font-bold text-2xl animate-bounce"
                   style={{ 
                     left: `${fishPosition.x + 30}px`, 
                     top: `${fishPosition.y - 20}px`,
                   }}>
                +KASVU!
              </div>
            )}
          </>
        )}
        
        {(isPlaying || gameOver) && hooks.map(hook => (
          <Hook 
            key={hook.id}
            position={hook.position}
            challenge={hook.challenge}
            speed={hook.speed}
          />
        ))}
        
        {(isPlaying || gameOver) && foods.map(food => (
          <FishFood 
            key={food.id}
            id={food.id}
            position={food.position}
            color={food.color}
          />
        ))}
        
        <div className="md:hidden absolute bottom-0 left-0 right-0 flex justify-between p-4 z-40">
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm mx-auto">
            <button 
              onTouchStart={() => setKeys(prev => ({ ...prev, ArrowLeft: true }))}
              onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowLeft: false }))}
              className="bg-white bg-opacity-50 text-gameColors-navy p-3 rounded-full"
            >
              ◄
            </button>
            <div className="flex flex-col gap-2">
              <button 
                onTouchStart={() => setKeys(prev => ({ ...prev, ArrowUp: true }))}
                onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowUp: false }))}
                className="bg-white bg-opacity-50 text-gameColors-navy p-3 rounded-full"
              >
                ▲
              </button>
              <button 
                onTouchStart={() => setKeys(prev => ({ ...prev, ArrowDown: true }))}
                onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowDown: false }))}
                className="bg-white bg-opacity-50 text-gameColors-navy p-3 rounded-full"
              >
                ▼
              </button>
            </div>
            <button 
              onTouchStart={() => setKeys(prev => ({ ...prev, ArrowRight: true }))}
              onTouchEnd={() => setKeys(prev => ({ ...prev, ArrowRight: false }))}
              className="bg-white bg-opacity-50 text-gameColors-navy p-3 rounded-full"
            >
              ►
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-center text-gray-600 max-w-2xl">
        <p>Käytä nuolinäppäimiä liikuttaaksesi kalaa. Kerää ruokaa ja väistä koukkuja, joissa on terveydenhuollon haasteita.</p>
        <p className="mt-1">Kala kasvaa, kun keräät ruokaa! Peli vaikeutuu pisteiden kertyessä.</p>
      </div>
    </div>
  );
};

export default Game;
