import { useMemo } from 'react';
import { type ColDef } from 'ag-grid-community';
import { useTranslation } from 'contexts/translation-context';
import { type Page } from 'hooks/use-blip-queries';
import { type Column } from 'components/blip-table/types/column';
import { NodeCellRenderer } from '../components/node-cell-renderer';

interface Params<TData> {
  columns: Column<TData>[];
  hasNodeColumn: boolean;
  checkbox?: boolean;
}

export function useColumnDefs<TData>({
  columns,
  hasNodeColumn,
  checkbox,
}: Params<TData>) {
  const { t } = useTranslation();

  return useMemo(() => {
    const columnDefs = columns
      .filter((column) => Boolean(column.table))
      .map((column) => {
        return {
          field: column.field,
          headerName: t(column.header),
          ...column.table,
        } as ColDef<TData & { page: Page }>;
      });

    if (!hasNodeColumn) {
      if (checkbox) {
        columnDefs[0].checkboxSelection = true;
        return [columnDefs[0], ...columnDefs.slice(1)];
      }
      return columnDefs;
    }

    return [
      {
        colId: 'node',
        headerName: t({
          pt: 'Chatbot',
          en: 'Chatbot',
          es: 'Chatbot',
        }),
        valueGetter: (params) => params.node,
        cellRenderer: NodeCellRenderer,
        checkboxSelection: checkbox,
      } as ColDef<TData & { page: Page }>,
      ...columnDefs,
    ];
  }, [checkbox, columns, hasNodeColumn, t]);
}
