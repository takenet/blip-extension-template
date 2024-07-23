import { useMemo } from 'react';
import { type UseBlipQueryResult } from 'hooks/use-blip-queries/utils/blip-error';

export function useNodesToFetchMore<TData>(
  queries: UseBlipQueryResult<TData>[],
) {
  const queriesByNode = useMemo(() => {
    return queries.reduce<Record<string, UseBlipQueryResult<TData>[]>>(
      (acc, query) => {
        if (!query.data) return acc;

        const node = query.data.page.node ?? 'current';

        if (node in acc) {
          acc[node].push(query);
          return acc;
        }

        acc[node] = [query];
        return acc;
      },
      {},
    );
  }, [queries]);

  const nodesToFetchMore = useMemo(() => {
    return Object.entries(queriesByNode).filter(
      ([, q]) => q[q.length - 1]?.data?.items.length !== 0,
    );
  }, [queriesByNode]);

  return nodesToFetchMore;
}
