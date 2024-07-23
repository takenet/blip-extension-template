import {
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Text,
} from '@mantine/core';
import type { ICellRendererParams } from 'ag-grid-community';
import { JsonViewer } from 'components/table/cell-renderers/json-viewer';

export function MessageContentCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, unknown>) {
  if (!value) return null;

  if (typeof value !== 'string') {
    return (
      <JsonViewer name="content" className="!justify-start" value={value} />
    );
  }

  return (
    <HoverCard width={280} shadow="md" withArrow>
      <HoverCardTarget>
        <div className="relative flex h-[40px] items-center gap-xs">
          <div className="absolute left-0 top-0 size-full truncate">
            {value}
          </div>
        </div>
      </HoverCardTarget>
      <HoverCardDropdown>
        <Text size="sm" className="whitespace-pre-wrap">
          {value}
        </Text>
      </HoverCardDropdown>
    </HoverCard>
  );
}
