import * as React from 'react';
import IntroPage from '@fur-guess/pages/IntroPage';
import GamePage from '@fur-guess/pages/GamePage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('intro');

  const navigateToGame = () => {
    setCurrentPage('game');
  };

  const navigateToIntro = () => {
    setCurrentPage('intro');
  };

  return (
    <div>
      {currentPage === 'intro' ? (
        <IntroPage onNavigate={navigateToGame} />
      ) : (
        <GamePage onNavigateToIntro={navigateToIntro} />
      )}
    </div>
  );
}

export default App;
