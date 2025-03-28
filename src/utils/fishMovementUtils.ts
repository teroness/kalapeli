
import { GameSize, Position } from '@/types/gameTypes';

export const updateFishPosition = (
  fishPosition: Position,
  keys: { [key: string]: boolean },
  gameSize: GameSize,
  fishSize: number,
  setFishDirection: (direction: 'left' | 'right') => void
): Position => {
  const newPos = { ...fishPosition };
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
};
