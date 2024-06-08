import { useState, useEffect } from 'react';
import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { Progress } from '@repo/ui/progress';
import { Question, questions as originalQuestions } from '@fur-guess/data/questions';

interface GamePageProps {
  onNavigateToIntro: () => void;
  onGameEnd: (correct: number, total: number, time: number) => void;
}

function shuffleArray(array: Question[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function GamePage({ onNavigateToIntro, onGameEnd }: GamePageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questions, setQuestions] = useState(() => shuffleArray([...originalQuestions]));

  useEffect(() => {
    setCurrentQuestion(0);
    setGuess('');
    setCorrectGuesses(0);
    setStartTime(new Date());
    setQuestions(shuffleArray([...originalQuestions]));
  }, []);

  const handleGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();
    const isCorrect = questions[currentQuestion].answers.some(
      (answer: string) => answer.toLowerCase() === normalizedGuess
    );

    if (isCorrect) {
      setCorrectGuesses(correctGuesses + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setGuess('');
    } else {
      const endTime = new Date();
      const timeTaken = (endTime.getTime() - (startTime?.getTime() || 0)) / 1000;
      onGameEnd(isCorrect ? correctGuesses + 1 : correctGuesses, questions.length, timeTaken);
    }
  };

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] px-4 py-12 md:px-6 lg:py-24">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">FurGuess</h1>
        <p className="text-lg font-medium text-white/90">{currentQuestion + 1}번째 퍼슈트의 이름을 맞춰보세요.</p>
        <p className="text-lg font-medium text-white/90">공백을 제외한 이름을 입력하세요.</p>
        <div className="space-y-4">
          <Progress className="w-full" value={((currentQuestion + 1) / questions.length) * 100} />
          <img alt="Fur Suiter" className="mx-auto rounded-lg object-cover" src={questions[currentQuestion].image} />
          <div className="grid w-full gap-2">
            <Input
              className="flex-1 bg-white text-[#8B5CF6] hover:bg-white/90 text-center"
              placeholder="입력"
              type="text"
              value={guess}
              onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGuess()}
            />
            <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={handleGuess}>
              제출
            </Button>
          </div>
          <p className="text-lg font-medium text-white/90">
            정답률:{' '}
            <span className="font-bold text-white">{((correctGuesses / questions.length) * 100).toFixed(2)}%</span>
          </p>
          <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={onNavigateToIntro}>
            다시 시작
          </Button>
        </div>
      </div>
    </main>
  );
}
