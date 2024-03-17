import dynamic from 'next/dynamic';
import { Skeleton } from '@repo/ui/skeleton';
import { HomeForm } from '@moomin-money/components/home/home-form';
import { getUserName } from '@moomin-money/libs/auth';

function SkeletonLoading(): React.ReactElement {
  return (
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
  );
}

const MoneySpendBoard = dynamic(() => import('@moomin-money/components/money-spend-board'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

async function HomePage(): Promise<React.ReactElement> {
  const name = await getUserName();

  return (
    <div className="container items-center space-y-8">
      <section>
        <MoneySpendBoard />
      </section>
      <HomeForm
        defaultValues={{
          name,
        }}
      />
    </div>
  );
}

export default HomePage;
