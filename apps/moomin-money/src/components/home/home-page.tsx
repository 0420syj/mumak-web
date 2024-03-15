/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import dynamic from 'next/dynamic';
import { Skeleton } from '@repo/ui/skeleton';
import { getServerSession } from 'next-auth';
import { HomeForm } from '@moomin-money/components/home/home-form';
import { authOptions } from '@moomin-money/libs/auth';

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

async function HomePage(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  const allowedAccountList: string[] = process.env.GOOGLE_ACCOUNT_LIST!.split(',');

  const nameMap: Record<string, 'wanny' | 'moomin'> = {
    [allowedAccountList[0]]: 'wanny',
    [allowedAccountList[1]]: 'moomin',
  };

  return (
    <div className="container items-center space-y-8">
      <section>
        <MoneySpendBoard />
      </section>
      <HomeForm
        defaultValues={{
          name: session?.user?.email ? nameMap[session.user.email] : undefined,
        }}
      />
    </div>
  );
}

export default HomePage;
