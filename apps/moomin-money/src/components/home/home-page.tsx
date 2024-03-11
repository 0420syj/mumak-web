import dynamic from 'next/dynamic';
import { Skeleton } from '@repo/ui/skeleton';
import { HomeForm } from '@moomin-money/components/home/home-form';

const MoneySpendBoard = dynamic(() => import('@moomin-money/components/money-spend-board'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[60px] h-[28px]" />
        <Skeleton className="w-[64px] h-[24px]" />
      </div>
    </div>
  ),
});

function HomePage(): React.ReactElement {
  return (
    <div className="container items-center space-y-8">
      <MoneySpendBoard />
      <HomeForm />
    </div>
  );
}

export default HomePage;
