import dayjs from 'dayjs';
import {
  type SupportedLanguage,
  type TFunction,
} from 'contexts/translation-context';

export type ExportFormatType =
  | 'string'
  | 'date'
  | 'boolean'
  | 'string-array'
  | 'number';
export type FormatFunction = (
  value: unknown,
  t: TFunction,
  language: SupportedLanguage,
) => string;
export type Formatters = Record<ExportFormatType, FormatFunction>;

export const formatters: Formatters = {
  string: (value: unknown) => {
    if (typeof value !== 'string') return '';
    return value;
  },
  boolean: (value: unknown, t) => {
    if (typeof value !== 'boolean') return '';

    return value
      ? t({
          pt: 'Sim',
          en: 'Yes',
          es: 'Sí',
        })
      : t({
          pt: 'Não',
          en: 'No',
          es: 'No',
        });
  },
  date: (date: unknown, t, language) => {
    if (!date) {
      return '';
    }
    if (
      typeof date !== 'string' &&
      typeof date !== 'number' &&
      !(date instanceof Date)
    ) {
      return '';
    }
    if (language === 'en') return dayjs(date).format('MM/DD/YYYY HH:mm:ss');
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
  },
  number: (value: unknown) => {
    if (typeof value !== 'number') return '';
    return value.toString();
  },
  'string-array': (value: unknown) => {
    if (!Array.isArray(value)) return '';
    return value.join(', ');
  },
};
