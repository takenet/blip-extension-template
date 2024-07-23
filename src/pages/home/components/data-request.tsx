import { Button, Flex, Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { Textarea } from 'react-hook-form-mantine';
import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useTranslation } from 'contexts/translation-context';
import type { Disclosure } from 'hooks/use-disclosure';
import { track } from 'lib/utils/track';

interface Props {
  disclosure: Disclosure;
}

export function DataRequest({ disclosure }: Props) {
  const { t } = useTranslation();

  const resolver = useMemo(() => {
    const dataRequestSchema = object({
      message: string().min(
        1,
        t({
          pt: 'Por favor, descreva o dado que você precisa',
          en: 'Please describe the data you need',
          es: 'Por favor, describe los datos que necesitas',
        }),
      ),
    });

    return zodResolver(dataRequestSchema);
  }, [t]);

  const form = useForm({
    defaultValues: {
      message: '',
    },
    resolver,
  });

  return (
    <Modal
      opened={disclosure.opened}
      centered
      onClose={disclosure.close}
      title={t({
        en: 'Request a new data',
        pt: 'Pedir um novo dado',
        es: 'Solicitar un nuevo dato',
      })}
      styles={{
        title: {
          fontWeight: 700,
        },
      }}
    >
      <form
        onSubmit={form.handleSubmit((values) => {
          track('data-request', {
            message: values.message,
          });

          showNotification({
            variant: 'success',
            title: t({
              en: 'Request sent',
              pt: 'Pedido enviado',
              es: 'Solicitud enviada',
            }),
            message: t({
              pt: 'Vamos rever seu pedido e se possível, adicionaremos o dado',
              en: 'We will review your request and if possible, we will add the data',
              es: 'Revisaremos tu solicitud y si es posible, agregaremos los datos',
            }),
          });

          form.reset();
          disclosure.close();
        })}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Textarea
          label={
            <>
              {t({
                en: 'Describe the data you need',
                pt: 'Descreva o dado que você precisa',
                es: 'Describe los datos que necesitas',
              })}
            </>
          }
          control={form.control}
          rows={3}
          size="sm"
          w="100%"
          placeholder={t({
            pt: 'Eu gostaria de saber...',
            en: 'I would like to know...',
            es: 'Me gustaría saber...',
          })}
          name="message"
        />
        <Flex gap="xs" mt="xs">
          <Button
            fullWidth
            mt="sm"
            type="button"
            variant="light"
            color="gray"
            onClick={disclosure.close}
          >
            {t({
              en: 'Cancel',
              pt: 'Cancelar',
              es: 'Cancelar',
            })}
          </Button>
          <Button fullWidth mt="sm" type="submit" variant="primary">
            {t({
              en: 'Send',
              pt: 'Enviar',
              es: 'Enviar',
            })}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
