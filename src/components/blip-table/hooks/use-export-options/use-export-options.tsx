import { useMemo } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { type Column } from 'components/blip-table/types/column';
import { getExportItems } from './utils/get-export-items';
import { getExportSettings } from './utils/get-export-settings';

interface Params<TData> {
  columns: Column<TData>[];
  items: TData[];
}

export function useExportOptions<TData>({
  columns,
  items: rawItems,
}: Params<TData>) {
  const { t, language } = useTranslation();

  const columnSettings = useMemo(
    () => getExportSettings<TData>(columns, t),
    [columns, t],
  );

  const exportItems = useMemo(
    () => getExportItems(rawItems, columnSettings, t, language),
    [rawItems, columnSettings, t, language],
  );

  return {
    parsedItems: exportItems,
    columns: columnSettings,
  };
}
