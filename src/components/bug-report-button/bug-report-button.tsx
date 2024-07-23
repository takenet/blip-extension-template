import { BugReportOutline } from '@blip-ds/react-icons';
import { ActionIcon, Button, Flex, Modal, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm } from 'react-hook-form';
import { Checkbox, Textarea } from 'react-hook-form-mantine';
import { useTranslation } from 'contexts/translation-context';
import { useDisclosure } from 'hooks/use-disclosure';
import { track } from 'lib/utils/track';

export function BugReportButton() {
  const disclosure = useDisclosure();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      message: '',
      allowContact: true,
    },
  });

  return (
    <>
      <Tooltip
        label={t({
          pt: 'Reportar um bug',
          en: 'Report a bug',
          es: 'Reportar un error',
        })}
      >
        <ActionIcon
          onClick={() => {
            disclosure.open();
          }}
          variant="tertiary"
        >
          <BugReportOutline size="1.125rem" />
        </ActionIcon>
      </Tooltip>
      <Modal
        centered
        title={t({
          en: 'Report a bug',
          pt: 'Reportar um bug',
          es: 'Reportar un error',
        })}
        styles={{
          title: {
            fontWeight: 700,
          },
        }}
        opened={disclosure.opened}
        onClose={disclosure.close}
      >
        <form
          onSubmit={form.handleSubmit((values) => {
            track('bug-report', {
              message: values.message,
              allowContact: values.allowContact,
            });

            showNotification({
              variant: 'success',
              title: t({
                en: 'Bug reported!',
                pt: 'Bug reportado!',
                es: 'Error reportado!',
              }),
              message: t({
                en: 'Thank you for helping us improve!',
                pt: 'Obrigado por nos ajudar a melhorar!',
                es: '¡Gracias por ayudarnos a mejorar!',
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
            label={t({
              en: 'Tell what happened',
              pt: 'Conte o que aconteceu',
              es: 'Cuéntanos qué pasó',
            })}
            control={form.control}
            rows={3}
            size="sm"
            w="100%"
            placeholder={t({
              pt: 'Eu esperava que acontecesse X, mas aconteceu Y',
              en: 'I expected X to happen, but Y happened',
              es: 'Esperaba que sucediera X, pero sucedió Y',
            })}
            name="message"
          />
          <Flex mt="sm">
            <Checkbox
              name="allowContact"
              control={form.control}
              label={t({
                pt: 'Permitir que os desenvolvedores entrem em contato',
                en: 'Allow developers to contact me',
                es: 'Permitir a los desarrolladores que se pongan en contacto',
              })}
            />
          </Flex>
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
    </>
  );
}
