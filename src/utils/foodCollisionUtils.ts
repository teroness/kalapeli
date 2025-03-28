
import { FoodObject, Position } from '@/types/gameTypes';

export const checkFoodCollisions = (
  fishPosition: Position,
  foods: FoodObject[],
  fishSize: number,
  setIsEating: (isEating: boolean) => void,
  setFoods: (foods: FoodObject[]) => void,
  setScore: (score: number) => void,
  setFoodCollected: (count: number) => void,
  setIsGrowing: (isGrowing: boolean) => void,
  score: number,
  foodCollected: number
): boolean => {
  const fishWidth = 60 * fishSize;
  const fishHeight = 40 * fishSize;
  
  let foodEatenId = -1;
  
  // Only check for collision on foods that haven't been eaten yet
  const validFoods = foods.filter(food => !food.isEaten);
  
  // Check for food collisions
  for (const food of validFoods) {
    const fishCenterX = fishPosition.x + (fishWidth / 2);
    const fishCenterY = fishPosition.y + (fishHeight / 2);
    const foodCenterX = food.position.x + 15;
    const foodCenterY = food.position.y + 15;
    
    const distance = Math.sqrt(
      Math.pow(fishCenterX - foodCenterX, 2) + 
      Math.pow(fishCenterY - foodCenterY, 2)
    );
    
    // Simplified collision threshold
    const collisionThreshold = 25 * fishSize; // Scale with fish size
    
    if (distance < collisionThreshold) {
      console.log('FOOD EATEN!', food.id);
      foodEatenId = food.id;
      
      // Only detect one collision per frame
      break;
    }
  }
  
  if (foodEatenId !== -1) {
    // Start eating animation immediately
    setIsEating(true);
    
    // Immediately remove the eaten food from the foods array
    const updatedFoods = foods.filter(food => food.id !== foodEatenId);
    setFoods(updatedFoods);
    
    // Increase score and food collected count
    setScore(score + 10);
    setFoodCollected(foodCollected + 1);
    
    // Stop eating animation after a short time
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
};
