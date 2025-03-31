
import { FoodObject, GameSize, HookObject, Position } from "@/types/gameTypes";
import { FOOD_COLORS, HEALTH_CHALLENGES } from "@/constants/gameConstants";

export const generateHook = (gameSize: GameSize, difficulty: number, existingHooks: HookObject[]): HookObject => {
  const now = Date.now();
  const usedChallenges = existingHooks.map(h => h.challenge);
  const availableChallenges = HEALTH_CHALLENGES.filter(c => !usedChallenges.includes(c));
  
  const randomChallenge = availableChallenges.length > 0 
    ? availableChallenges[Math.floor(Math.random() * availableChallenges.length)]
    : HEALTH_CHALLENGES[Math.floor(Math.random() * HEALTH_CHALLENGES.length)];
    
  const randomY = Math.random() * (gameSize.height - 100);
  
  return {
    id: now,
    position: { x: gameSize.width, y: randomY },
    challenge: randomChallenge,
    speed: 2 + difficulty * 0.5
  };
};

export const generateFood = (gameSize: GameSize): FoodObject => {
  const now = Date.now();
  const randomColor = FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)];
  const randomY = Math.random() * (gameSize.height - 20);
  
  return {
    id: now + 1,
    position: { x: gameSize.width, y: randomY },
    color: randomColor,
    isEaten: false
  };
};

export const checkHookCollisions = (
  fishPosition: Position,
  hooks: HookObject[],
  fishSize: number
): HookObject | null => {
  const fishWidth = 60 * fishSize;
  const fishHeight = 40 * fishSize;

  for (const hook of hooks) {
    if (
      fishPosition.x + 10 < hook.position.x + 40 &&
      fishPosition.x + fishWidth - 10 > hook.position.x &&
      fishPosition.y + 5 < hook.position.y + 60 &&
      fishPosition.y + fishHeight - 5 > hook.position.y
    ) {
      return hook; // Return the actual colliding hook
    }
  }
  return null;
};

export const updateGameObjects = (
  hooks: HookObject[],
  foods: FoodObject[]
): { updatedHooks: HookObject[], updatedFoods: FoodObject[] } => {
  const updatedHooks = hooks
    .map(hook => ({
      ...hook,
      position: { ...hook.position, x: hook.position.x - hook.speed }
    }))
    .filter(hook => hook.position.x > -100);
  
  const updatedFoods = foods
    .map(food => ({
      ...food,
      position: { ...food.position, x: food.position.x - 3 }
    }))
    .filter(food => food.position.x > -20);
  
  return { updatedHooks, updatedFoods };
};

export const calculateNewFishPosition = (
  prevPos: Position,
  keys: { [key: string]: boolean },
  gameSize: GameSize,
  fishSize: number
): Position => {
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
  }
  if (keys.ArrowRight) {
    newPos.x = Math.min(gameSize.width - 60 * fishSize, newPos.x + moveStep);
  }
  
  return newPos;
};
