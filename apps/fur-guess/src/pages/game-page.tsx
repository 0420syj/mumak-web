import { useState, useEffect, useRef } from 'react';
import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { Progress } from '@repo/ui/progress';
import { Question, questions as originalQuestions } from '@fur-guess/data/questions';
import FeedbackCard from '@fur-guess/components/feedback-card';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface GamePageProps {
  onNavigateToIntro?: () => void;
  onGameEnd: (correct: number, total: number, time: number) => void;
}

function shuffleArray(array: Question[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function GamePage({ onGameEnd }: GamePageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [guess, setGuess] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questions, setQuestions] = useState<Question[]>(shuffleArray([...originalQuestions]));
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentQuestion(0);
    setGuess('');
    setCorrectGuesses(0);
    setStartTime(new Date());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestion]);

  const handleGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();

    if (normalizedGuess === '') {
      return;
    }

    const isCorrect = questions[currentQuestion].answers.some(
      (answer: string) => answer.toLowerCase() === normalizedGuess
    );

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setCorrectGuesses(correctGuesses + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setGuess('');
      setFeedback(null);
    } else {
      const endTime = new Date();
      const timeTaken = (endTime.getTime() - (startTime?.getTime() || 0)) / 1000;
      onGameEnd(correctGuesses, questions.length, timeTaken);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (feedback === null) {
        handleGuess();
      } else {
        handleNextQuestion();
      }
    }
  };

  if (questions.length === 0) return null;
  return (
    <div className="mx-auto max-w-md space-y-6 text-center" onKeyDown={handleKeyDown} tabIndex={0}>
      <p className="text-lg font-medium text-white/90">#{currentQuestion + 1}</p>
      <div className="space-y-4">
        <Progress className="w-full" value={((currentQuestion + 1) / questions.length) * 100} />
        <img
          alt="Fur Suiter"
          className="mx-auto rounded-lg object-cover aspect-square"
          src={questions[currentQuestion].image}
        />
        {feedback === null ? (
          <div className="flex space-x-4">
            <Input
              ref={inputRef}
              className="text-base flex-1 bg-white text-[#8B5CF6] hover:bg-white/90 text-center"
              placeholder="공백을 제외한 이름을 입력하세요"
              type="text"
              value={guess}
              onChange={e => setGuess(e.target.value)}
            />
            <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" onClick={handleGuess}>
              <ChevronRightIcon />
            </Button>
          </div>
        ) : (
          <FeedbackCard
            currentQuestion={currentQuestion}
            feedback={feedback}
            questions={questions}
            handleNextQuestion={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
}
