import { unparse } from 'papaparse';
import { type ExporterParams } from '../types';
import { downloadFile } from './download-file';

export function exportCsv({ items, name, t }: ExporterParams) {
  const csv = unparse(items);

  downloadFile(csv, 'text/csv', `${name}.csv`, t);
}
