import { type ColTypeDef } from 'ag-grid-community';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'contexts/translation-context';
import { languageToLocale } from 'components/dates-provider';

const languageToFormat = {
  en: 'MM/DD/YYYY HH:mm',
  pt: 'DD/MM/YYYY HH:mm',
  es: 'DD/MM/YYYY HH:mm',
};

export default function useColumnTypes<TData>() {
  const { t, language } = useTranslation();

  return useMemo(() => {
    const locale = languageToLocale[language];
    const format = languageToFormat[language];

    return {
      boolean: {
        valueFormatter: (params) =>
          params.value
            ? t({ pt: 'Sim', en: 'Yes', es: 'Sí' })
            : t({ pt: 'Não', en: 'No', es: 'No' }),
        cellRenderer: null,
      },
      date: {
        valueFormatter: (params) => {
          if (!params.value) return '';
          if (
            !(params.value instanceof Date) &&
            !(typeof params.value === 'string') &&
            !(typeof params.value === 'number')
          ) {
            return '';
          }

          return dayjs(params.value).locale(locale).format(format);
        },
      },
    } satisfies Record<string, ColTypeDef<TData>>;
  }, [language, t]);
}
