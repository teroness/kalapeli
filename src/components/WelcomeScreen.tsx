
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
      <h2 className="text-3xl font-bold mb-6 text-gameColors-pink">Kalapeli</h2>
      <p className="text-center mb-4 max-w-md">
        Sukella työelämän syviin vesiin yhdessä Pirhanan kanssa. Kerää ruokaa saadaksesi pisteitä ja väistä koukkuja!
      </p>
    <div className="bg-white text-black p-4 rounded-lg mb-6">
  <div className="grid grid-cols-3 gap-1 my-2">
    <div></div>
    <div className="border border-gameColors-navy rounded p-1 text-center">▲</div>
    <div></div>
    <div className="border border-gameColors-navy rounded p-1 text-center">◄</div>
    <div className="border border-gameColors-navy rounded p-1 text-center">▼</div>
    <div className="border border-gameColors-navy rounded p-1 text-center">►</div>
  </div>
</div>
          <div className="border border-gameColors-navy rounded p-1 text-center">▲</div>
          <div></div>
          <div className="border border-gameColors-navy rounded p-1 text-center">◄</div>
          <div className="border border-gameColors-navy rounded p-1 text-center">▼</div>
          <div className="border border-gameColors-navy rounded p-1 text-center">►</div>
        </div>
      </div>
      <Button 
        onClick={onStartGame} 
        variant="default" 
        className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white"
      >
        Aloita peli
      </Button>
    </div>
  );
};

export default WelcomeScreen;
