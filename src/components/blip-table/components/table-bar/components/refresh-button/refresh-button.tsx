import { RefreshOutline } from '@blip-ds/react-icons';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useTableContext } from 'components/blip-table/contexts/table-context';

export function RefreshButton() {
  const { queries } = useTableContext();

  return (
    <Tooltip label="Buscar dados novamente" withArrow>
      <ActionIcon
        onClick={() => {
          queries.forEach((q) => q.refetch());
        }}
        variant="tertiary"
        loading={queries.some((q) => q.isFetching)}
      >
        <RefreshOutline className="size-5" />
      </ActionIcon>
    </Tooltip>
  );
}
