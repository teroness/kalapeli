
import Game from '@/components/Game';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gameColors-navy to-gameColors-darkNavy p-4">
  <h1 className="text-4xl font-bold mb-6 text-white">
  <span className="text-gameColors-pink">Kalapeli</span>
      </h1>
      <p className="text-white mb-8 max-w-lg text-center">
        Kaikkien kalapelien äiti, jossa sukelletaan työelämän syviin vesiin. Ohjaa Pirhanaa nuolinäppäimillä, kasvata sitä keräämällä ruokaa ja väistä koukkuja!
      </p>
      
      <div className="w-full max-w-4xl">
        <Game />
      </div>
    </div>
  );
};

export default Index;
