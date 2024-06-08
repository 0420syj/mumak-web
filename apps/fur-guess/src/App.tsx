import * as React from 'react';
import IntroPage from '@fur-guess/pages/intro-page';
import GamePage from '@fur-guess/pages/game-page';
import ResultPage from '@fur-guess/pages/result-page';

function App() {
  const [currentPage, setCurrentPage] = React.useState('intro');
  const [result, setResult] = React.useState<{ correct: number; total: number; time: number } | null>(null);

  const handleGameEnd = (correct: number, total: number, time: number) => {
    setResult({ correct, total, time });
    setCurrentPage('result');
  };

  const handleGameRestart = () => {
    setResult(null);
    setCurrentPage('intro');
  };

  const navigateToGame = () => {
    setCurrentPage('game');
  };

  const navigateToIntro = () => {
    setCurrentPage('intro');
  };

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-t from-[#8B5CF6] to-[#EC4899] px-4 md:px-6">
      {currentPage === 'intro' ? (
        <IntroPage onNavigate={navigateToGame} />
      ) : result ? (
        <ResultPage result={result} onNavigateToIntro={handleGameRestart} />
      ) : (
        <GamePage onNavigateToIntro={navigateToIntro} onGameEnd={handleGameEnd} />
      )}
    </main>
  );
}

export default App;
