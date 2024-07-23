import { lazy, Suspense } from 'react';
import { useTranslation } from 'contexts/translation-context';
import { track } from 'lib/utils/track';
import { useTableContext } from 'components/blip-table/contexts/table-context';
import { useExportOptions } from 'components/blip-table/hooks/use-export-options';
import { ExportButtonFallback } from 'components/export/components/export-button-fallback';
import { exporters } from './utils/exporters';

const OriginalExportButton = lazy(() => {
  return import('../../../../../export/components/export-button').then(
    (mod) => ({
      default: mod.ExportButton,
    }),
  );
});

export function ExportButton<TData>() {
  const { dataType, queries } = useTableContext<TData>();
  const items = queries.flatMap((q) => q.data?.items ?? []);
  const options = useExportOptions({ columns: dataType.columns, items });
  const { t } = useTranslation();

  return (
    <Suspense fallback={<ExportButtonFallback />}>
      <OriginalExportButton
        name={t(dataType.label.plural)}
        exporters={exporters}
        items={items}
        defaultFormat="csv"
        onExport={(format) => {
          track('export-table', { format, tableName: dataType.name });
        }}
        options={{ pdf: options }}
        variant="tertiary"
      />
    </Suspense>
  );
}
