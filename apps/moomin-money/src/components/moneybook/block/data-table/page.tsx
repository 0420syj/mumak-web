import type { Payment } from './columns';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Delay for 1 second to simulate network latency.
  const data = await new Promise(resolve => {
    setTimeout(resolve, 1000, [
      {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'm@example.com',
      },
    ]);
  });

  // Fetch data from your API here.
  return (await data) as Payment[];
  // ...
}

export default async function DemoPage(): Promise<React.ReactElement> {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
