import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs';
import { getUserName } from '@moomin-money/libs/auth';
import { MoneySpendBoardSkeleton } from '@moomin-money/components/money-spend-board';

const DataTableContainer = dynamic(() => import('./block/data-table/data-table-container'), {
  ssr: false,
});

const MoneySpendBoard = dynamic(() => import('@moomin-money/components/money-spend-board'), {
  ssr: false,
  loading: () => <MoneySpendBoardSkeleton />,
});

async function MoneybookPage(): Promise<React.ReactElement> {
  const name = await getUserName('wanny');

  return (
    <div className="container items-center space-y-8">
      <section>
        <MoneySpendBoard />
      </section>
      <Tabs defaultValue={name}>
        <TabsList className="flex gap-4">
          <TabsTrigger className="w-full" value="wanny">
            🐶 빵떡
          </TabsTrigger>
          <TabsTrigger className="w-full" value="moomin">
            🐻‍❄️ 무민
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wanny">
          <DataTableContainer name="wanny" />
        </TabsContent>
        <TabsContent value="moomin">
          <DataTableContainer name="moomin" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MoneybookPage;
