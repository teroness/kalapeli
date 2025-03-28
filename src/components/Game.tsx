
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Fish from '@/components/Fish';
import Net from '@/components/Net';

// Health challenges for the nets
const HEALTH_CHALLENGES = [
  "Burnout",
  "Stress",
  "Long Hours",
  "Understaffing",
  "Budget Cuts",
  "Outdated Tech",
  "Paperwork",
  "Staff Shortage",
  "Pandemic",
  "Overcrowding"
];

interface NetObject {
  id: number;
  position: { x: number; y: number };
  challenge: string;
  speed: number;
}

const Game: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastNetTimeRef = useRef<number>(Date.now());
  
  const [gameSize, setGameSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 100, y: 200 });
  const [fishDirection, setFishDirection] = useState<'left' | 'right'>('right');
  const [nets, setNets] = useState<NetObject[]>([]);
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

  // Check collisions between fish and nets
  const checkCollisions = useCallback(() => {
    const fishWidth = 60;
    const fishHeight = 40;
    const netWidth = 100;
    const netHeight = 100;
    
    for (const net of nets) {
      // Simple rectangular collision detection
      if (
        fishPosition.x < net.position.x + netWidth &&
        fishPosition.x + fishWidth > net.position.x &&
        fishPosition.y < net.position.y + netHeight &&
        fishPosition.y + fishHeight > net.position.y
      ) {
        setIsPlaying(false);
        setGameOver(true);
        toast(`Game over! You were caught in a net: ${net.challenge}`);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        return true;
      }
    }
    return false;
  }, [fishPosition, nets]);

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

      // Create new nets
      const now = Date.now();
      const netSpawnInterval = Math.max(2000 - difficulty * 200, 800); // Decrease spawn time as difficulty increases
      
      if (now - lastNetTimeRef.current > netSpawnInterval) {
        const randomChallenge = HEALTH_CHALLENGES[Math.floor(Math.random() * HEALTH_CHALLENGES.length)];
        const randomY = Math.random() * (gameSize.height - 100);
        
        setNets(prevNets => [
          ...prevNets,
          {
            id: now,
            position: { x: gameSize.width, y: randomY },
            challenge: randomChallenge,
            speed: 1500 - difficulty * 100 // Nets move faster with higher difficulty
          }
        ]);
        
        lastNetTimeRef.current = now;
      }

      // Move nets
      setNets(prevNets => prevNets.map(net => ({
        ...net,
        position: { ...net.position, x: net.position.x - 5 }
      })).filter(net => net.position.x > -100)); // Remove nets that are off-screen

      // Check collisions
      if (!checkCollisions()) {
        // Increase score if no collision
        setScore(prevScore => prevScore + 1);
        
        // Increase difficulty every 500 points
        if (score > 0 && score % 500 === 0) {
          setDifficulty(prevDifficulty => Math.min(prevDifficulty + 1, 10));
          toast(`Difficulty increased to level ${Math.min(difficulty + 1, 10)}!`);
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
    setNets([]);
    setDifficulty(1);
    setFishPosition({
      x: gameSize.width / 4,
      y: gameSize.height / 2
    });
    lastNetTimeRef.current = Date.now();
    toast("Game started! Avoid the nets with health challenges!");
  };

  // Render game
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Game UI - Score and Controls */}
      <div className="w-full max-w-4xl bg-white rounded-t-lg shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gameColors-navy text-xl">Score:</span>
          <span className="text-xl text-gameColors-pink">{score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gameColors-navy">Level:</span>
          <span className="text-gameColors-purple font-bold">{difficulty}</span>
        </div>
        <Button 
          onClick={startGame} 
          variant="default" 
          className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
          disabled={isPlaying}
        >
          {gameOver ? "Play Again" : isPlaying ? "Playing..." : "Start Game"}
        </Button>
      </div>
      
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="w-full max-w-4xl h-[500px] water-background relative overflow-hidden rounded-b-lg shadow-md"
      >
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
            <h2 className="text-3xl font-bold mb-6 text-gameColors-pink">Piranha Dodge</h2>
            <p className="text-center mb-4 max-w-md">
              Guide your piranha through the water and avoid nets containing healthcare challenges!
            </p>
            <div className="bg-white text-black p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2 text-gameColors-navy">Controls:</h3>
              <p>Use arrow keys to move the fish:</p>
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
              Start Game
            </Button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
            <h2 className="text-3xl font-bold mb-4 text-gameColors-pink">Game Over!</h2>
            <p className="text-2xl mb-6">Your score: <span className="text-gameColors-pink font-bold">{score}</span></p>
            <Button 
              onClick={startGame} 
              variant="default" 
              className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
            >
              Play Again
            </Button>
          </div>
        )}
        
        {/* The fish */}
        {(isPlaying || gameOver) && <Fish position={fishPosition} direction={fishDirection} />}
        
        {/* The nets */}
        {(isPlaying || gameOver) && nets.map(net => (
          <Net 
            key={net.id}
            position={net.position}
            challenge={net.challenge}
            speed={net.speed}
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
        <p>Use the arrow keys to move the fish. Avoid the nets with healthcare challenges.</p>
        <p className="mt-1">The game gets more difficult as your score increases. Good luck!</p>
      </div>
    </div>
  );
};

export default Game;
