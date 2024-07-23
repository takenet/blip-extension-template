import { Box, Button, Text, Textarea, Title } from '@mantine/core';
import { useTranslation } from 'contexts/translation-context';
import type { FeedbackFormValues } from '../hooks/use-feedback-form';
import { useFeedbackForm } from '../hooks/use-feedback-form';
import { FeedbackRating } from './feedback-rating';

export interface FeedbackFormProps {
  onSubmit: (values: FeedbackFormValues) => void;
  onClose: () => void;
}

export function FeedbackForm({ onSubmit, onClose }: FeedbackFormProps) {
  const { t } = useTranslation();
  const { form } = useFeedbackForm({ onSubmit, onClose });

  return (
    <Box p="md">
      <form
        onSubmit={form.onSubmit}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title order={2} size="h5" ta="center">
          {t({
            en: 'Let us know how you feel!',
            pt: 'Diga como você se sente!',
            es: '¡Háganos saber cómo se siente!',
          })}
        </Title>
        <Box
          mt="md"
          style={{
            height: 59.6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FeedbackRating
            error={form.errors.rating}
            value={form.values.rating}
            onChange={(value) => {
              form.setValues((v) => ({ ...v, rating: value }));
            }}
          />
        </Box>
        <Textarea
          label={
            <Text size="sm">
              {t({
                en: 'Tell us why',
                pt: 'Conte-nos o motivo',
                es: 'Cuéntanos por qué',
              })}{' '}
              <Text c="dimmed" size="xs" span>
                {t({
                  en: '(optional)',
                  pt: '(opcional)',
                  es: '(opcional)',
                })}
              </Text>
            </Text>
          }
          onChange={(event) => {
            form.setValues((v) => ({
              ...v,
              message: (event.target as unknown as { value: string }).value,
            }));
          }}
          error={form.errors.message}
          value={form.values.message}
          minRows={3}
          autosize
          size="sm"
          w="100%"
          name="message"
          data-cy="feedback-message"
        />
        <Button
          fullWidth
          mt="sm"
          type="submit"
          variant="filled"
          radius={8}
          h={40}
          bg="#1c63de"
        >
          {t({
            en: 'Send feedback',
            pt: 'Enviar feedback',
            es: 'Enviar feedback',
          })}
        </Button>
      </form>
    </Box>
  );
}
