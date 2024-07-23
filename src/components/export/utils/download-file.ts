import { showNotification } from '@mantine/notifications';
import type { TFunction } from 'contexts/translation-context';

export function downloadFile(
  str: string,
  type: string,
  fileName: string,
  t: TFunction,
) {
  try {
    const blob = new Blob([str], { type });

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error(error);

    showNotification({
      title: t({
        pt: 'Erro',
        en: 'Error',
        es: 'Error',
      }),
      message: t({
        pt: 'Erro ao baixar arquivo',
        en: 'Error downloading file',
        es: 'Error downloading file',
      }),
      color: 'red',
    });
  }
}
