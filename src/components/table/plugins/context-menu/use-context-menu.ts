import { useCallback, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { CellContextMenuEvent } from 'ag-grid-community';
import { useDisclosure } from 'hooks/use-disclosure';

export function useContextMenu<TData>() {
  const contextMenuDisclosure = useDisclosure();
  const [contextMenuEvent, setContextMenuEvent] =
    useState<CellContextMenuEvent<TData> | null>(null);

  const onCellContextMenu = useCallback(
    (agEvent: CellContextMenuEvent<TData>) => {
      if (!agEvent.event) return;

      agEvent.node.setSelected(true, true);

      contextMenuDisclosure.open();
      setContextMenuEvent(agEvent);
    },
    [contextMenuDisclosure],
  );

  return { onCellContextMenu, contextMenuEvent, contextMenuDisclosure };
}
