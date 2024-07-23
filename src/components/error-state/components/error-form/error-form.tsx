import { Button, Flex, ModalCloseButton, Text, Title } from '@mantine/core';
import { SmileySad } from '@phosphor-icons/react/dist/ssr';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Checkbox, Textarea } from 'react-hook-form-mantine';
import { serializeError } from 'serialize-error';
import { defaultValues, type ErrorFormValues } from './utils/default-values';

export interface ErrorFormProps {
  onCancel: () => void;
  error: unknown;
  onSubmit: (values: ErrorFormValues) => void | Promise<void>;
}

export function ErrorForm({ error, onCancel, onSubmit }: ErrorFormProps) {
  const form = useForm({ defaultValues });

  useEffect(() => {
    form.reset({
      ...defaultValues,
      error: serializeError(error),
    });
  }, [error, form]);

  return (
    <FormProvider {...form}>
      <ModalCloseButton className="!absolute right-md top-md !mt-0" />
      <form
        className="mt-md flex flex-col gap-md"
        onSubmit={form.handleSubmit(async (values) => {
          await onSubmit(values);
        })}
      >
        <div className="flex gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-light text-blue-light-color">
            <SmileySad size={32} />
          </div>
          <Flex direction="column">
            <Title order={2} size="h5">
              Pedimos desculpas pelo inconveniente.
            </Title>
            <Text c="dimmed" mt={4} size="sm">
              Por favor, ajude-nos a corrigir este erro, reportando-o aos nossos
              desenvolvedores.
            </Text>
          </Flex>
        </div>
        <Textarea
          name="message"
          label={
            <>
              <span>Informações adicionais</span>
              <span className="italic text-dimmed">(opcional)</span>
            </>
          }
        />
        <Checkbox
          className="ml-16"
          name="allowCommunication"
          label="Permitir que entremos em contato para mais informações?"
        />
        <Flex gap="md" justify="end">
          <Button onClick={onCancel} type="button" variant="light">
            Cancelar
          </Button>
          <Button type="submit">Reportar erro</Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
