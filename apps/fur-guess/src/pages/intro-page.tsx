import { Button } from '@repo/ui/button';
import { useHotkeys } from 'react-hotkeys-hook';

interface IntroPageProps {
  onNavigate: () => void;
}

export default function IntroPage({ onNavigate }: IntroPageProps) {
  useHotkeys('Enter', onNavigate);

  return (
    <div className="mx-auto max-w-md space-y-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">FurGuess</h1>
      <p className="text-lg font-medium text-white/90">퍼슈터의 이름을 맞춰보세요!</p>
      <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={onNavigate}>
        시작! (Enter)
      </Button>
    </div>
  );
}
