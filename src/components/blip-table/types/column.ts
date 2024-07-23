import { type ColDef, type ColDefField } from 'ag-grid-community';
import {
  type ExportFormatType,
  type FormatFunction,
} from '../hooks/use-export-options/utils/formatters';

export interface Column<TData> {
  field: ColDefField<TData>;
  header: {
    pt: string;
    en: string;
    es: string;
  };
  export:
    | { width?: number; type?: ExportFormatType; format?: FormatFunction }
    | false;
  table: ColDef<TData> | false;
}
