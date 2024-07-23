import { showNotification } from '@mantine/notifications';
import { track } from 'lib/utils/track';
import { type TFunction } from 'contexts/translation-context';
import { Typst, type TypstFile } from './typst';

export const DEFAULT_ZOOM = 1.25;

export interface RenderData {
  kind: 'render';
  index: number;
  result: {
    data: Uint8ClampedArray;
    width: number;
    height: number;
  };
  duration: number;
}

export interface MeasureData {
  kind: 'measure';
  result: {
    width: number;
    height: number;
  }[];
  duration: number;
}

export async function typstSend<TData>(
  typst: Typst,
  message: {
    kind: string;
    [key: string]: unknown;
  },
) {
  return await new Promise<TData>((resolve) => {
    typst.send(message);
    typst.subscribe((event) => {
      if (event.data.kind === message.kind) {
        resolve(event.data.result as TData);
      }
    });
  });
}

interface Params {
  files: TypstFile[];
  previewed: string;
  t: TFunction;
  name?: string;
}

export async function exportTypst({ files, previewed, t, name }: Params) {
  const typst = new Typst({
    previewed,
    files,
  });

  typst.subscribe((event) => {
    if (event.data.kind === 'typeset') {
      const { diagnostics } = event.data.result as { diagnostics: string[] };
      diagnostics.forEach((diagnostic) => {
        // eslint-disable-next-line no-console --- Helps debugging
        console.log('diagnostic', diagnostic);
      });
    }
  });

  const measurements = await typstSend<unknown[]>(typst, { kind: 'measure' });

  await Promise.all(
    measurements.map((_, index) =>
      typstSend<{
        data: Uint8ClampedArray;
        width: number;
        height: number;
      }>(typst, { kind: 'render', index }),
    ),
  );

  const url = await typstSend<string | null>(typst, {
    kind: 'export',
    fileId: previewed,
  });

  if (!url) {
    track('export-pdf-error', { tableName: name });
    showNotification({
      message: t({
        pt: 'Não foi possível baixar o arquivo pois houve um erro na exportação.',
        en: 'Could not download the file because there was an error in the export.',
        es: 'No se pudo descargar el archivo porque hubo un error en la exportación.',
      }),
      variant: 'error',
    });
    return;
  }

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name
    ? `${name}.pdf`
    : `${t({
        en: 'document',
        pt: 'documento',
        es: 'documento',
      })}.pdf`;
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
