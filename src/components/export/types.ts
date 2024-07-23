import { type Icon } from '@phosphor-icons/react';
import { type TFunction } from 'contexts/translation-context';

export interface ExporterParams {
  items: Record<string, unknown>[];
  name: string;
  t: TFunction;
  options?: Record<string, unknown>;
}

export interface Exporter {
  icon: Icon;
  label?: string;
  export: (params: ExporterParams) => void;
}
