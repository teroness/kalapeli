
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
  
  // Check for food collisions
  for (const food of foods) {
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
      foodEatenId = food.id;
      // Only detect one collision per frame
      break;
    }
  }
  
  if (foodEatenId !== -1) {
    // Start eating animation immediately
    setIsEating(true);
    
    // Important: Create a new array without the eaten food
    const updatedFoods = foods.filter(food => food.id !== foodEatenId);
    
    // Update the foods state with the new array
    setFoods(updatedFoods);
    
    // Increase score and food collected count
    setScore(score + 10);
    const newFoodCollected = foodCollected + 1;
    setFoodCollected(newFoodCollected);
    
    // Stop eating animation after a short time
    setTimeout(() => {
      setIsEating(false);
    }, 300); // Slightly longer animation time
    
    // Check if fish should grow - grow on every piece of food
    setIsGrowing(true);
    setTimeout(() => setIsGrowing(false), 600);
    
    return true;
  }
  
  return false;
};
