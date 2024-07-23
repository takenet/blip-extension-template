import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef } from 'react';
import { Table, useNoRowsComponent } from 'components/table';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { NoneSelectedState } from 'components/none-selected-state';
import { type Page } from 'hooks/use-blip-queries';
import { QueriesBoundary } from 'components/queries-boundary';
import { useTranslation } from 'contexts/translation-context';
import { getRowId } from './utils/get-row-id';
import { useColumnDefs } from './hooks/use-column-defs';

export function TableInner<TData>() {
  const gridRef = useRef<AgGridReact<TData & { page: Page }>>(null);
  const { queries, dependencies, hasNodeColumn, dataType, setSelectedRow } =
    useTableContext<TData>();
  const { t } = useTranslation();
  const columnDefs = useColumnDefs<TData>({
    columns: dataType.columns,
    hasNodeColumn,
    checkbox: Boolean(setSelectedRow),
  });

  const Icon = dataType.icon;

  const noRowsComponent = useNoRowsComponent({
    icon: <Icon size={38} />,
    title: t({
      pt: `Nenhum ${t(dataType.label.singular)} encontrado`,
      en: `No ${t(dataType.label.plural)} found`,
      es: `No se encontraron ${t(dataType.label.plural)}`,
    }),
    description: t({
      pt: 'Caso filtros estejam sendo aplicados, tente ajustá-los.',
      en: 'If filters are being applied, try adjusting them.',
      es: 'Si se están aplicando filtros, intente ajustarlos.',
    }),
  });

  const missingDependency = dependencies?.find(
    (dependency) => !dependency.value,
  );

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    setSelectedRow?.(selectedRows[0] ?? null);
  }, [setSelectedRow]);

  if (missingDependency) {
    return (
      <NoneSelectedState
        label={missingDependency.label}
        iconComponent={missingDependency.icon}
      />
    );
  }

  return (
    <QueriesBoundary
      queries={queries}
      loadingTitle={t({
        pt: `Carregando ${t(dataType.label.plural)}...`,
        en: `Loading ${t(dataType.label.plural)}...`,
        es: `Cargando ${t(dataType.label.plural)}...`,
      })}
      errorTitle={t({
        pt: `Erro ao carregar ${t(dataType.label.plural)}`,
        en: `Error loading ${t(dataType.label.plural)}`,
        es: `Error al cargar ${t(dataType.label.plural)}`,
      })}
      errorProps={{ radius: 0, style: { flex: 1 } }}
    >
      {(successQueries) => {
        const rowData = successQueries.flatMap((q) => q.data?.items ?? []);

        return (
          <Table<TData & { page: Page }>
            gridRef={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows
            getRowId={getRowId}
            rowSelection={setSelectedRow ? 'single' : undefined}
            onSelectionChanged={onSelectionChanged}
            {...noRowsComponent}
          />
        );
      }}
    </QueriesBoundary>
  );
}
