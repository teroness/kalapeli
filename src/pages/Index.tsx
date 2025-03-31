
import Game from '@/components/Game';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gameColors-navy to-gameColors-darkNavy p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">
        <span className="text-gameColors-pink">Piranha</span> Väistelypeli
      </h1>
      <p className="text-white mb-8 max-w-lg text-center">
        Ohjaa Pirhanaa nuolinäppäimillä, kerää ruokaa saadaksesi pisteitä ja väistä koukkuja!
      </p>
      
      <div className="w-full max-w-4xl">
        <Game />
      </div>
      
      <footer className="mt-8 text-sm text-gray-400 text-center">
        <p>Ohjaa Pirhanaa nuolinäppäimillä, kerää ruokaa ja väistä koukkuja!</p>
      </footer>
    </div>
  );
};

export default Index;

  );
};

export default Index;
