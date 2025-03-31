
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  score: number;
  foodCollected: number;
  onRestart: () => void;
  reason?: string;
}


const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, foodCollected, onRestart, reason }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
      <h2 className="text-3xl font-bold mb-4 text-gameColors-pink">Peli päättyi!</h2>
      
      {reason && (
        <p className="text-lg italic text-center mb-4 text-gameColors-yellow">
          Kuolinsyy: {reason}
        </p>
      )}

      <p className="text-2xl mb-2">
        Pisteesi: <span className="text-gameColors-pink font-bold">{score}</span>
      </p>
      <p className="text-xl mb-6">
        Ruokaa kerätty: <span className="text-gameColors-orange font-bold">{foodCollected}</span>
      </p>
      <Button 
        onClick={onRestart} 
        variant="default" 
        className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
      >
        Pelaa uudelleen
      </Button>
    </div>
  );
};

export default GameOverScreen;
