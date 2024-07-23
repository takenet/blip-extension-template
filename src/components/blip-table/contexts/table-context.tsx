import { type UseQueryResult } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';
import {
  type GetApplicationResponse,
  type GetApplicationsResponse,
} from 'blip-iframe';
import { type UseBlipQueryResult } from 'hooks/use-blip-queries/utils/blip-error';
import { type Page } from 'hooks/use-blip-queries';
import { type DataType } from 'pages/home/utils/data-types';
import { type Dependency } from '../blip-table';

export interface TableContextType<TData = unknown> {
  dataType: DataType<TData>;
  pages: Page[];
  setPages: Dispatch<SetStateAction<Page[]>>;
  queries: UseBlipQueryResult<TData>[];
  applicationsQuery: UseQueryResult<GetApplicationsResponse>;
  applicationQuery: UseQueryResult<GetApplicationResponse>;
  hasNodeColumn: boolean;
  dependencies?: Dependency[];
  pageSize: number;
  pagination: boolean;
  selectedRow?: TData | null;
  setSelectedRow?: Dispatch<SetStateAction<TData | null>>;
}

export const TableContext = createContext<TableContextType | null>(null);

export function useTableContext<TData = unknown>() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context as TableContextType<TData>;
}
