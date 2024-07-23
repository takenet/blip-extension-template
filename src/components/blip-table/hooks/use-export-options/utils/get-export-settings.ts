import { type ColDefField } from 'ag-grid-community';
import { type TFunction } from 'contexts/translation-context';
import { type Column } from '../../../types/column';
import { type FormatFunction, formatters } from './formatters';

export interface ExportSetting<TData> {
  field: ColDefField<TData>;
  headerName: string;
  width?: number;
  format?: FormatFunction;
}

export function getExportSettings<TData>(
  columns: Column<TData>[],
  t: TFunction,
) {
  return columns
    .filter((c) => Boolean(c.export))
    .map((column) => {
      if (!column.export) {
        throw new Error(`Column "${column.field}" is not exportable`);
      }

      return {
        field: column.field,
        headerName: t(column.header),
        format: column.export.type
          ? formatters[column.export.type]
          : column.export.format,
        width: column.export.width,
      } as ExportSetting<TData>;
    });
}
