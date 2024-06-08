import { Button } from '@repo/ui/button';
import { Question } from '@fur-guess/data/questions';
import { useHotkeys } from 'react-hotkeys-hook';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface FeedbackCardProps {
  currentQuestion: number;
  feedback: 'correct' | 'incorrect' | null;
  questions: Question[];
  handleNextQuestion: () => void;
}

export default function FeedbackCard({ currentQuestion, feedback, questions, handleNextQuestion }: FeedbackCardProps) {
  useHotkeys('Enter', handleNextQuestion);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-white/90">{feedback === 'correct' ? '정답!' : '오답!'}</p>
      <a
        className="text-lg text-white/90 hover:underline"
        href={`https://x.com/${questions[currentQuestion].twitterNickname}`}
        target="_blank"
        rel="noreferrer"
      >
        {questions[currentQuestion].answers.join(',')} ({questions[currentQuestion].twitterNickname})
      </a>
      <div>
        <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" onClick={handleNextQuestion}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
