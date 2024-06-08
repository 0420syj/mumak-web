import { Button } from '@repo/ui/button';
import { useHotkeys } from 'react-hotkeys-hook';

interface ResultPageProps {
  result: { correct: number; total: number; time: number };
  onNavigateToIntro: () => void;
}

export default function ResultPage({ result, onNavigateToIntro }: ResultPageProps) {
  useHotkeys('r', onNavigateToIntro);

  return (
    <div className="mx-auto max-w-md space-y-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">결과</h1>
      <p className="text-lg font-medium text-white/90">
        {result.total}문제 중 {result.correct}문제를 맞췄습니다!
      </p>
      <p className="text-lg font-medium text-white/90">정답률: {((result.correct / result.total) * 100).toFixed(2)}%</p>
      <p className="text-lg font-medium text-white/90">소요 시간: {result.time.toFixed(2)}초</p>
      <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={onNavigateToIntro}>
        메인으로 돌아가기 (R)
      </Button>
    </div>
  );
}
