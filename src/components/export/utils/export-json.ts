import { showNotification } from '@mantine/notifications';
import { type ExporterParams } from '../types';
import { downloadFile } from './download-file';

export function exportJson({ items, name, t }: ExporterParams) {
  try {
    downloadFile(
      JSON.stringify(
        items,
        (key, value) => {
          if (typeof value === 'bigint') return value.toString();
          if (typeof value === 'symbol') return value.toString();

          if (typeof value === 'function') {
            return {
              __type: 'Function',
              name: (value as { name: string }).name,
              body: (value as { toString: () => string }).toString(),
            };
          }

          if (value instanceof Map) {
            return {
              __type: 'Map',
              value: Array.from(value.entries()),
            };
          }

          if (value instanceof Error) {
            return {
              __type: 'Error',
              message: value.message,
              stack: value.stack,
            };
          }

          if (value instanceof RegExp) {
            return {
              __type: 'RegExp',
              source: value.source,
              flags: value.flags,
            };
          }

          if (value instanceof Set) {
            return {
              __type: 'Set',
              value: Array.from(value),
            };
          }

          return value as unknown;
        },
        2
      ),
      'application/json',
      `${name}.json`,
      t
    );
  } catch (error) {
    console.error(error);

    showNotification({
      title: t({
        pt: 'Erro',
        en: 'Error',
        es: 'Error',
      }),
      message: t({
        pt: 'Erro ao exportar JSON',
        en: 'Error exporting JSON',
        es: 'Error exporting JSON',
      }),
      color: 'red',
    });
  }
}
