import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs';
import { getUserName } from '@moomin-money/libs/auth';
import DataTableContainer from './block/data-table/data-table-container';

async function MoneybookPage(): Promise<React.ReactElement> {
  const name = await getUserName('wanny');

  return (
    <div className="container items-center space-y-8">
      <Tabs defaultValue={name}>
        <TabsList className="flex gap-4">
          <TabsTrigger value="wanny">🐶 빵떡</TabsTrigger>
          <TabsTrigger value="moomin">🐻‍❄️ 무민</TabsTrigger>
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
