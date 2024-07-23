import type { FormEvent } from 'react';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { useTranslation } from 'contexts/translation-context';

export interface UseFeedbackFormParams {
  onSubmit: (values: FeedbackFormValues) => void;
  onClose: () => void;
}

export interface FeedbackFormValues {
  rating: number;
  message: string;
}

export function useFeedbackForm({ onSubmit, onClose }: UseFeedbackFormParams) {
  const { t } = useTranslation();

  const [values, setValues] = useState({
    rating: undefined as number | undefined,
    message: '',
  });

  const [errors, setErrors] = useState({
    rating: null as null | string,
    message: null as null | string,
  });

  const _onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.rating === undefined) {
      setErrors((e) => ({
        ...e,
        rating: t({
          en: 'Please select a rating',
          pt: 'Por favor, selecione uma avaliação',
          es: 'Por favor, seleccione una calificación',
        }),
      }));

      return;
    }

    onSubmit(values as FeedbackFormValues);
    showNotification({
      variant: 'success',
      color: 'green',
      title: t({
        en: 'Feedback sent!',
        pt: 'Feedback enviado!',
        es: 'Feedback enviado!',
      }),
      message: t({
        en: 'Thank you for your feedback!',
        pt: 'Obrigado pelo seu feedback!',
        es: '¡Gracias por tu feedback!',
      }),
    });
    onClose();
  };

  return {
    form: {
      values,
      setValues,
      errors,
      setErrors,
      onSubmit: _onSubmit,
    },
  };
}
