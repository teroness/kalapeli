import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Pirhana from '@/components/Fish';
import Hook from '@/components/Hook';
import FishFood from '@/components/FishFood';
import WaterPlants from '@/components/WaterPlants';
import GameHeader from '@/components/GameHeader';
import WelcomeScreen from '@/components/WelcomeScreen';
import GameOverScreen from '@/components/GameOverScreen';
import useKeyboardControls from '@/hooks/useKeyboardControls';
import useGameLoop from '@/hooks/useGameLoop';
import { GameSize, HookObject, FoodObject } from '@/types/gameTypes';

const Game: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [gameSize, setGameSize] = useState<GameSize>({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [fishPosition, setFishPosition] = useState({ x: 100, y: 200 });
  const [fishDirection, setFishDirection] = useState<'left' | 'right'>('right');
  const [hooks, setHooks] = useState<HookObject[]>([]);
  const [foods, setFoods] = useState<FoodObject[]>([]);
  const [difficulty, setDifficulty] = useState(1);
  const [foodCollected, setFoodCollected] = useState(0);
  const [fishSize, setFishSize] = useState(1);
  const [isEating, setIsEating] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  const keys = useKeyboardControls();

  useEffect(() => {
    if (foodCollected > 0) {
      const newSize = 1 + (foodCollected * 0.05);
      setFishSize(newSize);
    }
  }, [foodCollected]);

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
    const audio = new Audio('/Happy-Days(chosic.com).mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    if (!muted) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [muted]);

  const gameLoopState = useGameLoop({
    isPlaying,
    gameOver,
    setGameOver,
    gameSize,
    fishPosition,
    setFishPosition,
    fishDirection,
    setFishDirection,
    hooks,
    setHooks,
    foods,
    setFoods,
    keys,
    difficulty,
    setDifficulty,
    score,
    setScore,
    fishSize,
    foodCollected,
    setFoodCollected,
    setIsEating,
    setIsGrowing,
    setGameOverReason,
  });

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
    gameLoopState.frameCountRef.current = 0;
    gameLoopState.lastHookTimeRef.current = Date.now();
    gameLoopState.lastFoodTimeRef.current = Date.now();
    setIsGrowing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <GameHeader 
        score={score}
        difficulty={difficulty}
        foodCollected={foodCollected}
        isPlaying={isPlaying}
        gameOver={gameOver}
        onStartGame={startGame}
        muted={muted}
        setMuted={setMuted}
      />

      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-4xl h-[540px] bg-gradient-to-b from-sky-700 to-sky-900 overflow-hidden rounded-xl shadow-lg"
      >
        <WaterPlants gameSize={gameSize} fishX={fishPosition.x} />

        {!isPlaying && !gameOver && (
          <WelcomeScreen onStartGame={startGame} />
        )}

        {gameOver && (
          <GameOverScreen 
            score={score} 
            foodCollected={foodCollected} 
            onRestart={startGame} 
            reason={gameOverReason}
          />
        )}

        {(isPlaying || gameOver) && (
          <>
            <Pirhana 
              position={fishPosition} 
              direction={fishDirection} 
              size={fishSize}
              isEating={isEating}
              isGrowing={isGrowing}
            />

            {hooks.map(hook => (
              <Hook 
                key={hook.id}
                position={hook.position}
                challenge={hook.challenge}
                speed={hook.speed}
              />
            ))}

            {foods.map(food => (
              <FishFood
                key={food.id}
                id={food.id}
                position={food.position}
                color={food.color}
                isEaten={false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Game;

