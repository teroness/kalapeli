import React from 'react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white p-8 z-50">
      <h2 className="text-3xl font-bold mb-6 text-gameColors-pink">Ohje</h2>
      <p className="text-center mb-4 max-w-md">
        Liikuta Pirhanaa nuolinäppäimillä. Kerää mahdollisimman paljon ruokaa, ja vältä koukkuja!
      </p>
      <button
        onClick={onStartGame}
        className="bg-gameColors-pink hover:bg-gameColors-darkPink text-white px-4 py-2 rounded"
      >
        Aloita peli
      </button>
    </div>
  );
};

export default WelcomeScreen;
