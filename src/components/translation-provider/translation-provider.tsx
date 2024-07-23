import { useQuery } from '@tanstack/react-query';
import { getCurrentLanguage } from 'blip-iframe';
import type { ReactNode } from 'react';
import {
  type SupportedLanguage,
  TranslationProvider as OriginalTranslationProvider,
} from 'contexts/translation-context';

export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt';

export function TranslationProvider({ children }: { children: ReactNode }) {
  const languageQuery = useQuery({
    queryKey: ['language'],
    queryFn: async () => {
      const response = await getCurrentLanguage();

      if (!response.success) return DEFAULT_LANGUAGE;

      const language = response.data;
      const isSupported = ['en', 'es', 'pt'].includes(language);

      return (isSupported ? language : DEFAULT_LANGUAGE) as SupportedLanguage;
    },
  });

  const language = languageQuery.data ?? DEFAULT_LANGUAGE;

  return (
    <OriginalTranslationProvider language={language}>
      {children}
    </OriginalTranslationProvider>
  );
}
