import {
  DatesProvider as MantineDatesProvider,
  type DatesProviderSettings,
} from '@mantine/dates';
import { type ReactNode, useMemo } from 'react';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/es';
import { useTranslation } from 'contexts/translation-context';

interface Props {
  children: ReactNode;
}

export const languageToLocale = {
  pt: 'pt-br',
  en: 'en',
  es: 'es',
};

export function DatesProvider({ children }: Props) {
  const { language } = useTranslation();

  const settings = useMemo(
    () =>
      ({
        locale: languageToLocale[language] || 'pt-br',
        firstDayOfWeek: 0,
        weekendDays: [0, 6],
        timezone: 'America/Sao_Paulo',
      }) satisfies DatesProviderSettings,
    [language],
  );

  return (
    <MantineDatesProvider settings={settings}>{children}</MantineDatesProvider>
  );
}
