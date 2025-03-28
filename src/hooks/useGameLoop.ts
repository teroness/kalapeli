
import { useCallback, useEffect, useRef } from 'react';
import { FoodObject, GameSize, HookObject, Position } from '@/types/gameTypes';
import { checkHookCollisions, generateFood, generateHook, updateGameObjects } from '@/utils/gameUtils';

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
  setIsGrowing
}: UseGameLoopProps) => {
  const gameLoopRef = useRef<number | null>(null);
  const lastHookTimeRef = useRef<number>(Date.now());
  const lastFoodTimeRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);

  const checkFoodCollisions = useCallback(() => {
    const fishWidth = 60 * fishSize;
    const fishHeight = 40 * fishSize;
    
    let foodEaten = false;
    
    setFoods(prevFoods => {
      return prevFoods.map(food => {
        if (food.isEaten) return food;
        
        const fishCenterX = fishPosition.x + (fishWidth / 2);
        const fishCenterY = fishPosition.y + (fishHeight / 2);
        const foodCenterX = food.position.x + 15;
        const foodCenterY = food.position.y + 15;
        
        const distance = Math.sqrt(
          Math.pow(fishCenterX - foodCenterX, 2) + 
          Math.pow(fishCenterY - foodCenterY, 2)
        );
        
        const collisionThreshold = (fishWidth / 2 + 15);
        
        if (distance < collisionThreshold) {
          console.log('FOOD EATEN!', food.id);
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
        setIsGrowing(true);
        setTimeout(() => setIsGrowing(false), 800);
      }
      
      setTimeout(() => {
        setIsEating(false);
      }, 200);
    }
    
    return foodEaten;
  }, [fishPosition, fishSize, foodCollected, setFoodCollected, setFoods, setIsEating, setIsGrowing, setScore]);

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
        const newHook = generateHook(gameSize, difficulty, hooks);
        setHooks(prevHooks => [...prevHooks, newHook]);
        lastHookTimeRef.current = now;
      }

      const foodSpawnInterval = Math.max(1500 - difficulty * 50, 800);
      if (now - lastFoodTimeRef.current > foodSpawnInterval) {
        const newFood = generateFood(gameSize);
        setFoods(prevFoods => [...prevFoods, newFood]);
        lastFoodTimeRef.current = now;
      }

      if (shouldProcessFrame) {
        const { updatedHooks, updatedFoods } = updateGameObjects(hooks, foods);
        setHooks(updatedHooks);
        setFoods(updatedFoods);
        
        const ateFoodThisFrame = checkFoodCollisions();
        
        if (checkHookCollisions(fishPosition, hooks, fishSize)) {
          setIsPlaying(false);
          setGameOver(true);
          if (gameLoopRef.current) {
            cancelAnimationFrame(gameLoopRef.current);
            gameLoopRef.current = null;
          }
          return;
        }
        
        if (score > 0 && score % 500 === 0 && difficulty < 10) {
          setDifficulty(prevDifficulty => Math.min(prevDifficulty + 1, 10));
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
  }, [
    isPlaying, 
    gameOver, 
    keys, 
    gameSize, 
    checkFoodCollisions, 
    score, 
    difficulty, 
    fishSize, 
    hooks.length, 
    fishDirection,
    foods,
    hooks,
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
