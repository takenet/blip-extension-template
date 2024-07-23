import type { MenuProps } from '@mantine/core';
import { Menu, MenuTarget } from '@mantine/core';
import type { CellContextMenuEvent } from 'ag-grid-community';
import type { ReactNode } from 'react';
import { type Disclosure } from 'hooks/use-disclosure';

interface Props<TData = unknown> extends Omit<MenuProps, 'opened' | 'onClose'> {
  disclosure: Disclosure;
  contextMenuEvent: CellContextMenuEvent<TData> | null;
  children: ReactNode;
}

export function ContextMenu<TData = unknown>({
  disclosure,
  contextMenuEvent,
  children,
  ...rest
}: Props<TData>) {
  const event = contextMenuEvent?.event as PointerEvent | undefined;

  return (
    <Menu
      onClose={disclosure.close}
      opened={disclosure.opened}
      position="bottom-start"
      {...rest}
    >
      <MenuTarget>
        <div
          style={{
            position: 'absolute',
            left: event?.clientX,
            top: event?.clientY,
            height: 0,
            width: 0,
          }}
        />
      </MenuTarget>
      {children}
    </Menu>
  );
}
