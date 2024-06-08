import { Button } from '@repo/ui/button';

interface ResultPageProps {
  result: { correct: number; total: number; time: number };
  onNavigateToIntro: () => void;
}

export default function ResultPage({ result, onNavigateToIntro }: ResultPageProps) {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] px-4 py-12 md:px-6 lg:py-24">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">결과</h1>
        <p className="text-lg font-medium text-white/90">
          {result.total} 문제 중 {result.correct} 문제를 맞췄습니다!
        </p>
        <p className="text-lg font-medium text-white/90">
          정답률: {((result.correct / result.total) * 100).toFixed(2)}%
        </p>
        <p className="text-lg font-medium text-white/90">소요 시간: {result.time.toFixed(2)}초</p>
        <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={onNavigateToIntro}>
          다시 시작
        </Button>
      </div>
    </main>
  );
}
