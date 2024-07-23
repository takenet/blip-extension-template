import { type GetRowIdParams } from 'ag-grid-community';
import { type Page } from 'hooks/use-blip-queries';

export function getRowId<TData>(
  params: GetRowIdParams<TData & { page: Page }>,
) {
  let rowId;

  const data = params.data as {
    id?: unknown;
    identity?: unknown;
    [key: string]: unknown;
  } & {
    page: Page;
  };

  if ('id' in data) {
    rowId = String(data.id);
  } else if ('identity' in data) {
    rowId = String(data.identity);
  } else {
    try {
      rowId = JSON.stringify(data);
    } catch (error) {
      rowId = Math.random().toString();
    }
  }

  return `${params.data.page.node}-${rowId}`;
}
