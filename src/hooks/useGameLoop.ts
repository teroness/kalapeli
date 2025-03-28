
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
    
    let foodEatenId = -1;
    
    // Check for food collisions
    foods.forEach(food => {
      if (food.isEaten) return;
      
      const fishCenterX = fishPosition.x + (fishWidth / 2);
      const fishCenterY = fishPosition.y + (fishHeight / 2);
      const foodCenterX = food.position.x + 15;
      const foodCenterY = food.position.y + 15;
      
      const distance = Math.sqrt(
        Math.pow(fishCenterX - foodCenterX, 2) + 
        Math.pow(fishCenterY - foodCenterY, 2)
      );
      
      // Simplified collision threshold
      const collisionThreshold = 25;
      
      if (distance < collisionThreshold) {
        console.log('FOOD EATEN!', food.id);
        foodEatenId = food.id;
      }
    });
    
    if (foodEatenId !== -1) {
      // Mark the food as eaten - immediately remove it from the foods array
      setFoods((prevFoods: FoodObject[]) => 
        prevFoods.map(food => 
          food.id === foodEatenId ? { ...food, isEaten: true } : food
        )
      );
      
      // Increase score and food collected count
      setScore((prevScore: number) => prevScore + 10);
      setFoodCollected((prev: number) => prev + 1);
      
      // Trigger eating animation
      setIsEating(true);
      setTimeout(() => {
        setIsEating(false);
      }, 200);
      
      // Check if fish should grow
      if ((foodCollected + 1) % 5 === 0 && fishSize < 1.5) {
        setIsGrowing(true);
        setTimeout(() => setIsGrowing(false), 800);
      }
      
      return true;
    }
    
    return false;
  }, [fishPosition, fishSize, foods, foodCollected, setFoods, setScore, setFoodCollected, setIsEating, setIsGrowing]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      frameCountRef.current += 1;
      
      const shouldProcessFrame = frameCountRef.current % 2 === 0;
      
      if (shouldProcessFrame) {
        setFishPosition((prevPos: Position) => {
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
        setHooks((prevHooks: HookObject[]) => [...prevHooks, newHook]);
        lastHookTimeRef.current = now;
      }

      const foodSpawnInterval = Math.max(1500 - difficulty * 50, 800);
      if (now - lastFoodTimeRef.current > foodSpawnInterval) {
        const newFood = generateFood(gameSize);
        setFoods((prevFoods: FoodObject[]) => [...prevFoods, newFood]);
        lastFoodTimeRef.current = now;
      }

      if (shouldProcessFrame) {
        // First check for food collisions
        checkFoodCollisions();
        
        // Then clean up and update positions
        const { updatedHooks, updatedFoods } = updateGameObjects(hooks, foods);
        
        setHooks(updatedHooks);
        
        // Immediately remove eaten food from the game
        const validFoods = updatedFoods.filter(food => !food.isEaten);
        setFoods(validFoods);
        
        if (checkHookCollisions(fishPosition, hooks, fishSize)) {
          setGameOver(true);
          if (gameLoopRef.current) {
            cancelAnimationFrame(gameLoopRef.current);
            gameLoopRef.current = null;
          }
          return;
        }
        
        if (score > 0 && score % 500 === 0 && difficulty < 10) {
          setDifficulty((prevDifficulty: number) => Math.min(prevDifficulty + 1, 10));
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
