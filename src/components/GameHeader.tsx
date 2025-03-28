
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  score: number;
  difficulty: number;
  foodCollected: number;
  isPlaying: boolean;
  gameOver: boolean;
  onStartGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  score, 
  difficulty, 
  foodCollected, 
  isPlaying,
  gameOver,
  onStartGame 
}) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-t-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-bold text-gameColors-navy text-xl">Pisteet:</span>
        <span className="text-xl text-gameColors-pink">{score}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gameColors-navy">Taso:</span>
          <span className="text-gameColors-purple font-bold">{difficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gameColors-navy">Ruokaa kerätty:</span>
          <span className="text-gameColors-orange font-bold">{foodCollected}</span>
        </div>
      </div>
      <Button 
        onClick={onStartGame} 
        variant="default" 
        className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
        disabled={isPlaying}
      >
        {gameOver ? "Pelaa uudelleen" : isPlaying ? "Pelissä..." : "Aloita peli"}
      </Button>
    </div>
  );
};

export default GameHeader;
