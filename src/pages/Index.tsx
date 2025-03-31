import Game from '@/components/Game';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gameColors-navy to-gameColors-darkNavy p-4">
      <div className="w-full max-w-4xl">
        <Game />
      </div>
    </div>
  );
};

export default Index;
