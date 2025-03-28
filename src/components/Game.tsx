
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Fish from '@/components/Fish';
import Hook from '@/components/Hook';
import FishFood from '@/components/FishFood';

// Expanded and more outrageous health challenges in Finnish
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

// Fish food colors updated to match our theme
const FOOD_COLORS = [
  "#FF5A79", // Pink
  "#7A2E8E", // Purple
  "#0D2B5B", // Navy
  "#FF9800", // Orange
];

// Water plants configuration - updated with more plants and varieties
const WATER_PLANTS = [
  { x: 50, y: 400, type: 'seaweed', height: 120, color: '#33C3F0' },
  { x: 150, y: 450, type: 'coral', height: 80, color: '#F97316' },
  { x: 250, y: 420, type: 'seaweed', height: 90, color: '#0EA5E9' },
  { x: 300, y: 420, type: 'seaweed', height: 100, color: '#0EA5E9' },
  { x: 380, y: 390, type: 'coral', height: 70, color: '#7A2E8E' },
  { x: 450, y: 380, type: 'waterlily', width: 60, color: '#FF5A79' },
  { x: 500, y: 380, type: 'coral', height: 70, color: '#7A2E8E' },
  { x: 580, y: 410, type: 'waterlily', width: 50, color: '#7A2E8E' },
  { x: 650, y: 440, type: 'seaweed', height: 85, color: '#0D2B5B' },
  { x: 700, y: 430, type: 'seaweed', height: 110, color: '#1EAEDB' },
  { x: 780, y: 390, type: 'waterlily', width: 70, color: '#FF9800' },
  { x: 820, y: 410, type: 'seaweed', height: 95, color: '#33C3F0' },
  { x: 900, y: 400, type: 'coral', height: 90, color: '#FF5A79' },
  { x: 980, y: 430, type: 'seaweed', height: 115, color: '#0EA5E9' },
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
    const fishWidth = 60 * fishSize * 0.7;
    const fishHeight = 40 * fishSize * 0.7;
    const hookWidth = 40 * 0.7;
    const hookHeight = 60 * 0.7;
    
    for (const hook of hooks) {
      if (
        fishPosition.x + 10 < hook.position.x + hookWidth &&
        fishPosition.x + fishWidth - 10 > hook.position.x &&
        fishPosition.y + 5 < hook.position.y + hookHeight &&
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
    const fishWidth = 60 * fishSize * 0.6;
    const fishHeight = 40 * fishSize * 0.6;
    const foodWidth = 20 * 0.8;
    const foodHeight = 20 * 0.8;
    
    // Fix: Initialize the foodEaten variable to track if any food was eaten in this check
    let foodEaten = false;
    
    setFoods(prevFoods => {
      return prevFoods.map(food => {
        if (food.isEaten) return food;
        
        if (
          fishPosition.x + 15 < food.position.x + foodWidth &&
          fishPosition.x + fishWidth - 10 > food.position.x &&
          fishPosition.y + 10 < food.position.y + foodHeight &&
          fishPosition.y + fishHeight - 10 > food.position.y
        ) {
          foodEaten = true;
          return { ...food, isEaten: true };
        }
        return food;
      });
    });
    
    if (foodEaten) {
      setIsEating(true);
      
      setScore(prevScore => prevScore + 10);
      setFoodCollected(prev => prev + 1);
      
      if ((foodCollected + 1) % 5 === 0 && fishSize < 1.5) {
        setFishSize(prevSize => Math.min(prevSize + 0.1, 1.5));
      }
      
      setTimeout(() => {
        setIsEating(false);
        setFoods(prevFoods => prevFoods.filter(food => !food.isEaten));
      }, 300);
    }
  }, [fishPosition, foodCollected, fishSize]);

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
        
        checkFoodCollisions();
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
  }, [isPlaying, gameOver, keys, gameSize, checkHookCollisions, checkFoodCollisions, score, difficulty, fishSize, hooks.length]);

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
  };

  const renderWaterPlants = () => {
    const plants = [];
    
    for (const plant of WATER_PLANTS) {
      const adjustedX = (plant.x / 1000) * gameSize.width;
      
      if (plant.type === 'seaweed') {
        plants.push(
          <div 
            key={`plant-${plant.x}-${plant.y}`}
            className="absolute bottom-0 animate-swim"
            style={{ 
              left: `${adjustedX}px`,
              height: `${plant.height}px`,
              width: '30px',
              zIndex: 1
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
              zIndex: 1
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
            </svg>
          </div>
        );
      } else if (plant.type === 'waterlily') {
        const width = plant.width || 60;
        plants.push(
          <div 
            key={`plant-${plant.x}-${plant.y}`}
            className="absolute bottom-0 animate-swim"
            style={{ 
              left: `${adjustedX}px`,
              width: `${width}px`,
              height: `${width * 0.5}px`,
              zIndex: 1
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
          <Fish 
            position={fishPosition} 
            direction={fishDirection} 
            size={fishSize}
            isEating={isEating}
          />
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
