import WannyDataTable from './block/wanny-data-table';
import DemoPage from './block/data-table/page';

function MoneybookPage(): React.ReactElement {
  return (
    <div className="container items-center space-y-8">
      Moneybook Page
      <DemoPage />
      <WannyDataTable />
    </div>
  );
}

export default MoneybookPage;
