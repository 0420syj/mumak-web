'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="날짜" />,
    accessorKey: '날짜',
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="내용" />,
    accessorKey: '내용',
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="금액" />,
    accessorKey: '금액',
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
];
