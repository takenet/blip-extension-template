import { useQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { type Response } from 'blip-iframe';
import { BlipError, type UseBlipQueryResult } from './utils/blip-error';
import { autoFetchNextPage } from './utils/auto-fetch-next-page';

export interface Page {
  node?: string;
  filter?: string;
  take: number;
  skip: number;
}

export interface UseBlipQueriesParams<TData> {
  queryKey: unknown[];
  queryFn: (page: Page) => Promise<Response<{ items: TData[] }>>;
  filter?: string;
  /**
   * The LIME nodes to fetch data from.
   *
   * Look something like this: shortName\@msging.net
   */
  nodes?: (string | undefined)[];
  enabled?: boolean;
  /**
   * The number of pages to fetch automatically.
   */
  autoFetch?: number;
  pagination?: boolean;
  pageSize?: number;
}

const defaultProps = {
  nodes: ['current'],
  pagination: true,
  pageSize: 100,
};

export function useBlipQueries<TData>({
  queryFn,
  queryKey,
  filter,
  nodes = defaultProps.nodes,
  enabled,
  autoFetch,
  pageSize = defaultProps.pageSize,
  pagination = defaultProps.pagination,
}: UseBlipQueriesParams<TData>) {
  const getInitialPages = useCallback(() => {
    return nodes.map((node) => ({
      node: node !== 'current' ? node : undefined,
      take: pageSize,
      skip: 0,
      filter,
    }));
  }, [filter, nodes, pageSize]);

  const [pages, setPages] = useState<Page[]>(getInitialPages);

  useEffect(() => {
    setPages(getInitialPages());
  }, [getInitialPages]);

  const queries: UseBlipQueryResult<TData>[] = useQueries({
    queries: pages.map((page) => ({
      staleTime: 1000 * 15,
      retry: false,
      enabled,
      queryKey: [...queryKey, page.node, page.take, page.skip, page.filter],
      queryFn: async () => {
        try {
          const response = await queryFn(page);

          if (!response.success) {
            throw new BlipError(response.error.message, page);
          }

          const items = response.data.items.map((item) => ({ ...item, page }));

          if (pagination && autoFetch && items.length >= 90) {
            autoFetchNextPage({
              autoFetch,
              setPages,
              previousPage: page,
            });
          }

          return { items, page };
        } catch (error) {
          if (error instanceof BlipError) {
            throw error;
          }
          if (error instanceof Error) {
            throw new BlipError(error.message, page);
          }
          throw new BlipError('Unknown error', page);
        }
      },
      meta: { showErrorNotification: false },
    })),
  });

  return { queries, pages, setPages };
}
