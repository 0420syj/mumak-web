import dynamic from 'next/dynamic';
import { HomeForm } from '@moomin-money/components/home/home-form';
import { getUserName } from '@moomin-money/libs/auth';
import { MoneySpendBoardSkeleton } from '@moomin-money/components/money-spend-board';

const MoneySpendBoard = dynamic(() => import('@moomin-money/components/money-spend-board'), {
  ssr: false,
  loading: () => <MoneySpendBoardSkeleton />,
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
