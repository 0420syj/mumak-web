import DataTableContainer from './block/data-table/data-table-container';

function MoneybookPage(): React.ReactElement {
  return (
    <div className="container items-center space-y-8">
      <DataTableContainer name="wanny" />
    </div>
  );
}

export default MoneybookPage;
