import { FilePdf } from '@phosphor-icons/react';
import { type Exporter } from 'components/export/types';
import { exportPdf } from '../export-pdf';

export type ExtraFormat = 'pdf';

export const exporters: Record<ExtraFormat, Exporter> = {
  pdf: { icon: FilePdf, export: exportPdf },
};
