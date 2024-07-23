import { get } from 'lodash';
import {
  type SupportedLanguage,
  type TFunction,
} from 'contexts/translation-context';
import { formatters } from './formatters';
import { type ExportSetting } from './get-export-settings';

export function getExportItems<TData>(
  items: TData[],
  columns: ExportSetting<TData>[],
  t: TFunction,
  language: SupportedLanguage,
) {
  return items.map((item) => {
    return columns.reduce<Record<string, unknown>>((acc, column) => {
      const value = get(item, column.field) as unknown;

      let formattedValue: string;

      if (column.format) {
        formattedValue = column.format(value, t, language);
      } else if (!((typeof value) in formatters)) {
        formattedValue = '';
      } else {
        const format = formatters[typeof value as keyof typeof formatters];
        formattedValue = format(value, t, language);
      }

      return { ...acc, [column.field]: formattedValue };
    }, {});
  }) as Record<string, string>[];
}
