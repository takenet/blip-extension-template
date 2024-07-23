import { ArrowDownOutline } from '@blip-ds/react-icons';
import {
  Button,
  Flex,
  LoadingOverlay,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  Tooltip,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useTranslation } from 'contexts/translation-context';
import { track } from 'lib/utils/track';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { type Page } from 'hooks/use-blip-queries';
import { useNodesToFetchMore } from './hooks/use-nodes-to-fetch-more';

export function PaginationHandler<TData>() {
  const { queries, setPages, pagination, pageSize } = useTableContext<TData>();
  const nodesToFetchMore = useNodesToFetchMore(queries);

  const canFetchMore = pagination && nodesToFetchMore.length > 0;
  const isFetching = queries.some((q) => q.isFetching);
  const itemCount = queries.reduce(
    (acc, q) => acc + (q.data?.items.length ?? 0),
    0,
  );

  const { t } = useTranslation();
  const [pageCount, setPageCount] = useLocalStorage({
    key: 'pageCount',
    defaultValue: 1,
  });

  return (
    <div className="flex items-center gap-xs">
      <Text className="whitespace-nowrap" size="xs" c="dimmed">
        <Text span>
          {t({
            pt: 'Exibindo ',
            en: 'Showing ',
            es: 'Mostrando ',
          })}
        </Text>
        <Text span fw={800}>
          {itemCount}
        </Text>
        <Text span>
          {t({
            pt: ' itens de ',
            en: ' items of ',
            es: ' items de ',
          })}
        </Text>
        <Text span fw={800}>
          {canFetchMore
            ? t({
                pt: 'mais',
                en: 'more',
                es: 'más',
              })
            : itemCount}
        </Text>
      </Text>
      <Tooltip label="Todos os items já foram buscados" disabled={canFetchMore}>
        <Flex className="relative">
          <LoadingOverlay
            visible={isFetching}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ size: 'xs' }}
          />

          <Button
            size="xs"
            disabled={!canFetchMore}
            variant="light"
            onClick={() => {
              track('click-fetch-more', { itemCount, pageCount });

              const newPages: Page[] = [];

              for (const [node, nodeQueries] of nodesToFetchMore) {
                if (nodeQueries.length === 0) {
                  continue;
                }

                const lastQuery = nodeQueries[nodeQueries.length - 1];

                if (!lastQuery.data) {
                  continue;
                }

                const lastPage = lastQuery.data.page;

                for (let index = 0; index < pageCount; index++) {
                  const newPage: Page = {
                    node: node !== 'current' ? node : undefined,
                    take: lastPage.take,
                    skip: lastPage.skip + lastPage.take * (index + 1),
                    filter: lastPage.filter,
                  };
                  newPages.push(newPage);
                }
              }

              setPages((p) => [...p, ...newPages]);
            }}
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              paddingRight: 4,
            }}
          >
            {t({ pt: 'Buscar mais', en: 'Fetch more', es: 'Buscar más' })}
          </Button>

          <Menu
            shadow="md"
            width={100}
            withArrow
            position="bottom-end"
            arrowPosition="center"
          >
            <MenuTarget>
              <Button
                size="xs"
                disabled={!canFetchMore}
                styles={{
                  root: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    paddingLeft: 4,
                  },
                  section: { marginLeft: 2 },
                }}
                rightSection={<ArrowDownOutline size={18} />}
                variant="light"
              >
                {pageCount * pageSize}
              </Button>
            </MenuTarget>

            <MenuDropdown>
              {[1, 2, 5].map((value) => (
                <MenuItem
                  key={value}
                  c={value === pageCount ? 'blue' : undefined}
                  ta="center"
                  onClick={() => {
                    setPageCount(value);
                  }}
                >
                  {value * pageSize}{' '}
                  {t({
                    pt: 'itens',
                    en: 'items',
                    es: 'items',
                  })}
                </MenuItem>
              ))}
            </MenuDropdown>
          </Menu>
        </Flex>
      </Tooltip>
    </div>
  );
}
