import type { ICellRendererParams } from 'ag-grid-community';
import { JsonViewer } from './json-viewer';

export function JsonCellRenderer<TData>({
  value,
}: ICellRendererParams<TData, unknown>) {
  return <JsonViewer name="metadata" value={value} />;
}
