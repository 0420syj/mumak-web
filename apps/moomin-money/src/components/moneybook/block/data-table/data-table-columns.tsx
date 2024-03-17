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
    header: ({ column }) => <DataTableColumnHeader column={column} title="날짜" />,
    accessorKey: '날짜',
    cell: ({ row }) => {
      const data = parseFloat(row.getValue('날짜'));
      const formatted = convertToDate(data).toLocaleDateString('ko-KR');

      return <div className="text-left text-nowrap">{formatted}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="내용" />,
    accessorKey: '내용',
    cell: ({ row }) => {
      const data: string = row.getValue('내용');

      return <div className="text-left text-nowrap">{data}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="금액" />,
    accessorKey: '금액',
    cell: ({ row }) => {
      const data = parseFloat(row.getValue('금액'));
      const formatted = data.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

      return <div className="text-right text-nowrap">{formatted}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="카테고리" />,
    accessorKey: '카테고리',
    cell: ({ row }) => {
      const data: string = row.getValue('카테고리');

      return <div className="text-left text-nowrap">{data}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="결제수단" />,
    accessorKey: '결제수단',
    cell: ({ row }) => {
      const data: string = row.getValue('결제수단');

      return <div className="text-left text-nowrap">{data}</div>;
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="비고" />,
    accessorKey: '비고',
    cell: ({ row }) => {
      const data: string = row.getValue('비고');

      return <div className="text-left line-clamp-1">{data}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">메뉴 열기</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- safe */}
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(rowData.비고)}>비고 복사</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>상세 보기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
