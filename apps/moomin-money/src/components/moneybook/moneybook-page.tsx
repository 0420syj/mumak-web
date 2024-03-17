import WannyDataTable from './block/wanny-data-table';

function MoneybookPage(): React.ReactElement {
  return (
    <div className="container items-center space-y-8">
      <WannyDataTable name="wanny" />
    </div>
  );
}

export default MoneybookPage;
