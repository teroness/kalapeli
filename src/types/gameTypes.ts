
export interface HookObject {
  id: number;
  position: { x: number; y: number };
  challenge: string;
  speed: number;
}

export interface FoodObject {
  id: number;
  position: { x: number; y: number };
  color: string;
  isEaten: boolean;
}

export interface GameSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface PlantObject {
  x: number;
  y: number;
  type: 'seaweed' | 'coral' | 'waterlily';
  height?: number;
  width?: number;
  color: string;
  animationDelay: string;
}
