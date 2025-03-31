<h1 className="text-4xl font-bold mb-6 text-white">
  <span className="text-gameColors-pink">Kalapeli</span>
</h1>

<p className="text-white mb-8 max-w-lg text-center">
  Tervetuloa Kalapeliin! Sukella työelämän syviin vesiin ja väistele koukkuja!
</p>

  
import Game from '@/components/Game';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gameColors-navy to-gameColors-darkNavy p-4">
      <div className="w-full max-w-4xl">
        <Game />
      </div>

      <footer className="mt-8 text-sm text-gray-400 text-center">
        <p> Ohjaa Pirhanaa nuolinäppäimillä, kerää pisteitä ja varo osumasta koukkuihin!</p>
      </footer>
    </div>
  );
};

export default Index;
