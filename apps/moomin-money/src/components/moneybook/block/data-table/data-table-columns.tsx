'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@repo/ui/data-table';
import { convertToDate } from '@repo/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu';
import { Checkbox } from '@repo/ui/checkbox';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Moneybook extends Record<string, string | number> {
  날짜: number;
  내용: string;
  금액: number;
  카테고리: string;
  결제수단: string;
  비고: string;
}

export const columns: ColumnDef<Moneybook>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={value => {
          row.toggleSelected(Boolean(value));
        }}
      />
    ),
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="날짜" />,
    accessorKey: '날짜',
    cell: ({ row }) => {
      const data = parseFloat(row.getValue('날짜'));
      const formatted = convertToDate(data).toLocaleDateString();

      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="내용" />,
    accessorKey: '내용',
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="금액" />,
    accessorKey: '금액',
    cell: ({ row }) => {
      const data = parseFloat(row.getValue('금액'));
      const formatted = data.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="카테고리" />,
    accessorKey: '카테고리',
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="결제수단" />,
    accessorKey: '결제수단',
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="비고" />,
    accessorKey: '비고',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- safe */}
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(rowData.결제수단)}>
              Copy 결제수단
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
