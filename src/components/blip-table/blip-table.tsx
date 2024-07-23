import { lazy, Suspense } from 'react';
import { type BaseIcon } from '@blip-ds/react-icons';
import { type Response } from 'blip-iframe';
import {
  type Page,
  useBlipQueries,
  type UseBlipQueriesParams,
} from 'hooks/use-blip-queries';
import { useNodes } from 'hooks/use-nodes';
import { useApplicationsQuery } from 'hooks/use-applications-query';
import { useApplicationQuery } from 'hooks/use-application-query';
import { type DataType } from 'pages/home/utils/data-types';
import { LoadingState } from 'components/loading-state';
import { TableContext, type TableContextType } from './contexts/table-context';
import { TableBar } from './components/table-bar';

const TableInner = lazy(() =>
  import('./components/table-inner').then((module) => ({
    default: module.TableInner,
  })),
);

export interface Dependency {
  name: string;
  value: unknown;
  label: string;
  icon: BaseIcon;
}

export interface BlipTableProps<TData>
  extends Omit<UseBlipQueriesParams<TData>, 'queryKey' | 'queryFn' | 'nodes'> {
  dataType: DataType<TData>;
  hasNodeColumn?: boolean;
  dependencies?: Dependency[];
  currentNodeOnly?: boolean;
  selectedRow?: TData | null;
  setSelectedRow?: (row: TData | null) => void;
  queryFn: (
    page: Page,
    dependencies?: Record<string, unknown>,
  ) => Promise<Response<{ items: TData[] }>>;
}

export function BlipTable<TData>({
  dataType,
  hasNodeColumn = true,
  dependencies,
  queryFn,
  currentNodeOnly,
  pageSize = 100,
  pagination = true,
  selectedRow,
  setSelectedRow,
  ...queriesParams
}: BlipTableProps<TData>) {
  const applicationsQuery = useApplicationsQuery();
  const applicationQuery = useApplicationQuery();

  const _dependencies =
    dependencies?.reduce(
      (acc, dep) => ({ ...acc, [dep.name]: dep.value }),
      {},
    ) ?? {};

  const nodes = useNodes({ currentOnly: currentNodeOnly });

  const { pages, queries, setPages } = useBlipQueries<TData>({
    queryKey: [dataType.name, dependencies?.map((d) => d.value)],
    enabled: dependencies?.every((dep) => Boolean(dep.value)),
    nodes,
    queryFn: (page) => queryFn(page, _dependencies),
    autoFetch: 10,
    pagination,
    pageSize,
    ...queriesParams,
  });

  return (
    <TableContext.Provider
      value={
        {
          dataType,
          pages,
          queries,
          setPages,
          applicationsQuery,
          applicationQuery,
          hasNodeColumn,
          dependencies,
          pageSize,
          pagination,
          selectedRow,
          setSelectedRow,
        } as TableContextType
      }
    >
      <div className="flex size-full flex-col">
        <TableBar />
        <Suspense fallback={<LoadingState />}>
          <TableInner />
        </Suspense>
      </div>
    </TableContext.Provider>
  );
}
