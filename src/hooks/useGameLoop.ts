
import { useCallback, useEffect, useRef } from 'react';
import { FoodObject, GameSize, HookObject, Position } from '@/types/gameTypes';
import { checkHookCollisions, updateGameObjects } from '@/utils/gameUtils';
import { checkFoodCollisions } from '@/utils/foodCollisionUtils';
import { updateFishPosition } from '@/utils/fishMovementUtils';
import { spawnGameObjects } from '@/utils/gameSpawningUtils';
import { updateDifficulty } from '@/utils/gameDifficultyUtils';

interface UseGameLoopProps {
  isPlaying: boolean;
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
  gameSize: GameSize;
  fishPosition: Position;
  setFishPosition: (position: Position) => void;
  fishDirection: 'left' | 'right';
  setFishDirection: (direction: 'left' | 'right') => void;
  hooks: HookObject[];
  setHooks: (hooks: HookObject[]) => void;
  foods: FoodObject[];
  setFoods: (foods: FoodObject[]) => void;
  keys: { [key: string]: boolean };
  difficulty: number;
  setDifficulty: (difficulty: number) => void;
  score: number;
  setScore: (score: number) => void;
  fishSize: number;
  setFishSize: (size: number) => void
  foodCollected: number;
 
  setFoodCollected: (count: number) => void;
  setIsEating: (isEating: boolean) => void;
  setIsGrowing: (isGrowing: boolean) => void;
}

const useGameLoop = ({
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
  setFishSize,
}: UseGameLoopProps) => {
  const gameLoopRef = useRef<number | null>(null);
  const lastHookTimeRef = useRef<number>(Date.now());
  const lastFoodTimeRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);

  const handleFoodCollisions = useCallback(() => {
    return checkFoodCollisions(
      fishPosition,
      foods,
      fishSize,
      setIsEating,
      setFoods,
      setScore,
      setFoodCollected,
      setIsGrowing,
      setFishSize,
      score,
      foodCollected
    );
  }, [fishPosition, fishSize, foods, foodCollected, setFoods, setScore, setFoodCollected, setIsEating, setIsGrowing, score]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      frameCountRef.current += 1;
      
      const shouldProcessFrame = frameCountRef.current % 2 === 0;
      
      if (shouldProcessFrame) {
        // Update fish position based on keyboard controls
        const newPosition = updateFishPosition(
          fishPosition,
          keys,
          gameSize,
          fishSize,
          setFishDirection
        );
        setFishPosition(newPosition);
      }

      const now = Date.now();
      
      // Handle spawning of hooks and food
      spawnGameObjects(
        now,
        lastHookTimeRef,
        lastFoodTimeRef,
        gameSize,
        difficulty,
        hooks,
        foods,
        setHooks,
        setFoods
      );

      if (shouldProcessFrame) {
        // Process food collisions first
        const foodCollisionOccurred = handleFoodCollisions();
        
        // Then update the positions of remaining hooks and foods
        const { updatedHooks, updatedFoods } = updateGameObjects(hooks, foods);
        
        setHooks(updatedHooks);
        
        // Only update foods if no collision occurred - otherwise the food is already removed
        if (!foodCollisionOccurred) {
          setFoods(updatedFoods);
        }
        
        const collidedHook = checkHookCollisions(fishPosition, hooks, fishSize);
if (collidedHook) {
  setGameOver(true);
  setGameOverReason(`${collidedHook.challenge} tappoi Pirhanan`);

          if (gameLoopRef.current) {
            cancelAnimationFrame(gameLoopRef.current);
            gameLoopRef.current = null;
          }
          return;
        }
        
        // Update difficulty based on score
        updateDifficulty(score, difficulty, setDifficulty);
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
  }, [
    isPlaying, 
    gameOver, 
    keys, 
    gameSize, 
    handleFoodCollisions, 
    score, 
    difficulty, 
    fishSize, 
    hooks, 
    foods,
    fishPosition,
    setDifficulty,
    setFishDirection,
    setFishPosition,
    setFoods,
    setGameOver,
    setHooks
  ]);

  return {
    frameCountRef,
    lastHookTimeRef,
    lastFoodTimeRef
  };
};

export default useGameLoop;
