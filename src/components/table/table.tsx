import type { ReactNode, RefObject } from 'react';
import type { AgGridReactProps } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useComputedColorScheme } from '@mantine/core';
import clsx from 'clsx';
import type { GetRowIdFunc } from 'ag-grid-community';
import { AG_GRID_LOCALE_PT_BR } from './utils/ag-grid-locale-pt-br';
import classes from './table.module.css';
import useColumnTypes from './hooks/use-column-types';

interface Props<TData> extends AgGridReactProps<TData> {
  gridRef?: RefObject<AgGridReact<TData>>;
  emptyStateButton?: ReactNode;
  getRowId: GetRowIdFunc<TData>;
}

export function Table<TData = unknown>({
  className,
  gridRef,
  ...rest
}: Props<TData>) {
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const columnTypes = useColumnTypes<TData>();

  return (
    <div
      className={clsx(
        classes.root,
        computedColorScheme === 'dark'
          ? 'ag-theme-quartz-dark'
          : 'ag-theme-quartz',
      )}
    >
      <AgGridReact<TData>
        animateRows
        columnTypes={columnTypes}
        className={clsx(classes.table, className)}
        enableCellTextSelection
        localeText={AG_GRID_LOCALE_PT_BR}
        preventDefaultOnContextMenu
        reactiveCustomComponents
        ref={gridRef}
        {...rest}
      />
    </div>
  );
}
