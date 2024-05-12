import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';

interface GamePageProps {
  onNavigateToIntro: () => void;
}

export default function GamePage({ onNavigateToIntro }: GamePageProps) {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] px-4 py-12 md:px-6 lg:py-24">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">FurGuess</h1>
        <div className="space-y-4">
          <img
            alt="Fur Suiter"
            className="mx-auto rounded-lg"
            src="/placeholder.svg"
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
          />
          <div className="grid w-full max-w-sm gap-2">
            <Input className="flex-1" placeholder="Guess the name of the fur-suiter" type="text" />
            <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg">
              제출
            </Button>
          </div>
          <div className="text-lg font-medium text-white/90">
            You have guessed
            <span className="font-bold text-white">3</span> out of <span className="font-bold text-white">5</span>
            correctly.{'\n                '}
          </div>
          <Button className="bg-white text-[#8B5CF6] hover:bg-white/90" size="lg" onClick={onNavigateToIntro}>
            다시 시작
          </Button>
        </div>
      </div>
    </main>
  );
}
