
import { FoodObject, GameSize, HookObject } from '@/types/gameTypes';
import { generateFood, generateHook } from '@/utils/gameUtils';

export const spawnGameObjects = (
  now: number,
  lastHookTimeRef: React.MutableRefObject<number>,
  lastFoodTimeRef: React.MutableRefObject<number>,
  gameSize: GameSize,
  difficulty: number,
  hooks: HookObject[],
  foods: FoodObject[],
  setHooks: (hooks: HookObject[]) => void,
  setFoods: (foods: FoodObject[]) => void
): void => {
  const hookSpawnInterval = Math.max(5000 - difficulty * 100, 3000);
  
  if (now - lastHookTimeRef.current > hookSpawnInterval) {
    const newHook = generateHook(gameSize, difficulty, hooks);
    const updatedHooks = [...hooks, newHook];
    setHooks(updatedHooks);
    lastHookTimeRef.current = now;
  }

  const foodSpawnInterval = Math.max(1500 - difficulty * 50, 800);
  if (now - lastFoodTimeRef.current > foodSpawnInterval) {
    const newFood = generateFood(gameSize);
    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    lastFoodTimeRef.current = now;
  }
};
