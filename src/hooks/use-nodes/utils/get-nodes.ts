import { showNotification } from '@mantine/notifications';
import { type GetApplicationResponse } from 'blip-iframe';
import { z } from 'zod';
import { type TFunction } from 'contexts/translation-context';

const childSchema = z.object({
  identity: z.string(),
});

const settingsSchema = z.object({
  children: z.array(childSchema),
});

export function getNodes(application: GetApplicationResponse, t: TFunction) {
  const isRouter = application.template === 'master';

  if (!isRouter) {
    return ['current'];
  }

  const settings = application.applicationJson.settings;

  if (!settings) {
    console.error('Settings was not found in this router');
    showNotification({
      title: t({ pt: 'Erro', en: 'Error', es: 'Error' }),
      message: t({
        pt: 'Configurações não encontradas neste roteador',
        en: 'Settings was not found in this router',
        es: 'No se encontraron configuraciones en este enrutador',
      }),
      variant: 'error',
    });
    return [];
  }

  const parsedSettings = settingsSchema.safeParse(settings);

  if (!parsedSettings.success) {
    console.error(parsedSettings.error);
    showNotification({
      title: t({ pt: 'Erro', en: 'Error', es: 'Error' }),
      message: t({
        pt: 'Erro ao processar as configurações',
        en: 'Error processing settings',
        es: 'Error al procesar la configuración',
      }),
      variant: 'error',
    });
    return [];
  }

  return [
    'current',
    ...parsedSettings.data.children.map((child) => child.identity),
  ];
}
