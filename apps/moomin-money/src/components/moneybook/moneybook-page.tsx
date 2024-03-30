import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs';
import dynamic from 'next/dynamic';
import { Skeleton } from '@repo/ui/skeleton';
import { getUserName } from '@moomin-money/libs/auth';

const DataTableContainer = dynamic(() => import('./block/data-table/data-table-container'), {
  ssr: false,
  loading: () => (
    <div>
      <div className="py-4">
        <Skeleton className="rounded-md h-10" />
      </div>
      <div className="pb-2">
        <Skeleton className="rounded-md h-10" />
      </div>
      <div className="pb-2">
        <Skeleton className="rounded-md h-6" />
      </div>
      <Skeleton className="rounded-md h-[531.5px]" />
    </div>
  ),
});

async function MoneybookPage(): Promise<React.ReactElement> {
  const name = await getUserName('wanny');

  return (
    <div className="container items-center space-y-8">
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
