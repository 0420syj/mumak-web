import type { Table } from '@tanstack/react-table';
import { Input } from '@repo/ui/input';

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  columnId: string;
}

export function DataTableFilter<TData>({
  table,
  placeholder,
  columnId,
}: DataTableFilterProps<TData>): React.ReactElement {
  return (
    <Input
      className="max-w-sm text-base h-10"
      onChange={event => table.getColumn(columnId)?.setFilterValue(event.target.value)}
      placeholder={placeholder}
      value={table.getColumn(columnId)?.getFilterValue() as string}
    />
  );
}
