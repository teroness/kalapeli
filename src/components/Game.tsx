import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Fish from '@/components/Fish';
import Hook from '@/components/Hook';

// Health challenges in Finnish
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
  "Leikkaukset"
];

interface HookObject {
  id: number;
  position: { x: number; y: number };
  challenge: string;
  speed: number;
}

const Game: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastHookTimeRef = useRef<number>(Date.now());
  
  const [gameSize, setGameSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 100, y: 200 });
  const [fishDirection, setFishDirection] = useState<'left' | 'right'>('right');
  const [hooks, setHooks] = useState<HookObject[]>([]);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [difficulty, setDifficulty] = useState(1);
  
  // Initialize game size
  useEffect(() => {
    const updateGameSize = () => {
      if (gameAreaRef.current) {
        setGameSize({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight
        });
        // Reset fish position when game area resizes
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

  // Handle keyboard input
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

  // Check collisions between fish and hooks
  const checkCollisions = useCallback(() => {
    const fishWidth = 60;
    const fishHeight = 40;
    const hookWidth = 60;
    const hookHeight = 80;
    
    for (const hook of hooks) {
      // Simple rectangular collision detection
      if (
        fishPosition.x < hook.position.x + hookWidth &&
        fishPosition.x + fishWidth > hook.position.x &&
        fishPosition.y < hook.position.y + hookHeight &&
        fishPosition.y + fishHeight > hook.position.y
      ) {
        setIsPlaying(false);
        setGameOver(true);
        toast(`Peli päättyi! Jäit kiinni: ${hook.challenge}`);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return true;
      }
    }
    return false;
  }, [fishPosition, hooks]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      // Move fish based on key presses
      setFishPosition(prevPos => {
        let newPos = { ...prevPos };
        const moveStep = 5;
        
        if (keys.ArrowUp) {
          newPos.y = Math.max(0, newPos.y - moveStep);
        }
        if (keys.ArrowDown) {
          newPos.y = Math.min(gameSize.height - 40, newPos.y + moveStep);
        }
        if (keys.ArrowLeft) {
          newPos.x = Math.max(0, newPos.x - moveStep);
          setFishDirection('left');
        }
        if (keys.ArrowRight) {
          newPos.x = Math.min(gameSize.width - 60, newPos.x + moveStep);
          setFishDirection('right');
        }
        
        return newPos;
      });

      // Create new hooks
      const now = Date.now();
      const hookSpawnInterval = Math.max(2000 - difficulty * 200, 800); // Decrease spawn time as difficulty increases
      
      if (now - lastHookTimeRef.current > hookSpawnInterval) {
        const randomChallenge = HEALTH_CHALLENGES[Math.floor(Math.random() * HEALTH_CHALLENGES.length)];
        const randomY = Math.random() * (gameSize.height - 100);
        
        setHooks(prevHooks => [
          ...prevHooks,
          {
            id: now,
            position: { x: gameSize.width, y: randomY },
            challenge: randomChallenge,
            speed: 1500 - difficulty * 100 // Hooks move faster with higher difficulty
          }
        ]);
        
        lastHookTimeRef.current = now;
      }

      // Move hooks
      setHooks(prevHooks => prevHooks.map(hook => ({
        ...hook,
        position: { ...hook.position, x: hook.position.x - 5 }
      })).filter(hook => hook.position.x > -100)); // Remove hooks that are off-screen

      // Check collisions
      if (!checkCollisions()) {
        // Increase score if no collision
        setScore(prevScore => prevScore + 1);
        
        // Increase difficulty every 500 points
        if (score > 0 && score % 500 === 0) {
          setDifficulty(prevDifficulty => Math.min(prevDifficulty + 1, 10));
          toast(`Vaikeustaso nousi tasolle ${Math.min(difficulty + 1, 10)}!`);
        }
        
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [isPlaying, gameOver, keys, gameSize, checkCollisions, score, difficulty]);

  // Start game 
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setHooks([]);
    setDifficulty(1);
    setFishPosition({
      x: gameSize.width / 4,
      y: gameSize.height / 2
    });
    lastHookTimeRef.current = Date.now();
    toast("Peli alkoi! Väistä terveydenhuollon haasteita!");
  };

  // Render game
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Game UI - Score and Controls */}
      <div className="w-full max-w-4xl bg-white rounded-t-lg shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gameColors-navy text-xl">Pisteet:</span>
          <span className="text-xl text-gameColors-pink">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gameColors-navy">Taso:</span>
          <span className="text-gameColors-purple font-bold">{difficulty}</span>
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
      
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="w-full max-w-4xl h-[500px] water-background relative overflow-hidden rounded-b-lg shadow-md"
      >
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
            <h2 className="text-3xl font-bold mb-6 text-gameColors-pink">Piranha-väistelypeli</h2>
            <p className="text-center mb-4 max-w-md">
              Ohjaa piraijaa vedessä ja väistä koukkuja, joissa on terveydenhuollon haasteita!
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
            <p className="text-2xl mb-6">Pisteesi: <span className="text-gameColors-pink font-bold">{score}</span></p>
            <Button 
              onClick={startGame} 
              variant="default" 
              className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
            >
              Pelaa uudelleen
            </Button>
          </div>
        )}
        
        {/* The fish */}
        {(isPlaying || gameOver) && <Fish position={fishPosition} direction={fishDirection} />}
        
        {/* The hooks */}
        {(isPlaying || gameOver) && hooks.map(hook => (
          <Hook 
            key={hook.id}
            position={hook.position}
            challenge={hook.challenge}
            speed={hook.speed}
          />
        ))}
        
        {/* Mobile controls overlay - only shown on touch devices */}
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
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-center text-gray-600 max-w-2xl">
        <p>Käytä nuolinäppäimiä liikuttaaksesi kalaa. Väistä koukkuja, joissa on terveydenhuollon haasteita.</p>
        <p className="mt-1">Peli vaikeutuu pisteiden kertyessä. Onnea matkaan!</p>
      </div>
    </div>
  );
};

export default Game;
