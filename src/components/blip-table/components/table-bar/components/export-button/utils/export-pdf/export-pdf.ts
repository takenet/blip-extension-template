// cSpell:ignore fwAZl0LYct4f4xq4jkgzxg

import { showNotification } from '@mantine/notifications';
import { type Record } from '@phosphor-icons/react';
import { type ExporterParams } from 'components/export/types';
import { exportTypst } from '../export-typst';
import { tableSourceCode } from '../export-typst/table-source-code';

export const previewed = 'fwAZl0LYct4f4xq4jkgzxg';

export async function exportPdf({ name, options, t }: ExporterParams) {
  if (!options?.columns || !options.parsedItems) {
    const message = t({
      pt: 'Erro ao exportar PDF: as colunas e os itens não foram fornecidos.',
      en: 'Error exporting PDF: columns and items were not provided.',
      es: 'Error al exportar PDF: las columnas y los elementos no se proporcionaron.',
    });

    console.error(message);

    showNotification({
      title: t({ pt: 'Erro', en: 'Error', es: 'Error' }),
      message,
      variant: 'error',
    });

    return;
  }

  await exportTypst({
    files: [
      {
        name: 'main.typ',
        id: previewed,
        content: {
          source: tableSourceCode(
            options.parsedItems as Record<string, unknown>[],
            options.columns,
          ),
        },
      },
    ],
    previewed,
    name,
    t,
  });
}
