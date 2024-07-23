import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

export const supportedLanguages = ['pt', 'en', 'es'] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];
export type TFunction = (
  translations: Record<SupportedLanguage, string>,
) => string;

export const TranslationContext = createContext<{
  language: SupportedLanguage;
  t: (translations: Record<SupportedLanguage, string>) => string;
  setLanguage: (language: SupportedLanguage) => void;
} | null>(null);

export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt';

export interface TranslationProviderProps {
  children: ReactNode;
  language: SupportedLanguage;
  setLanguage?: (language: SupportedLanguage) => void;
}

export function TranslationProvider({
  children,
  language = DEFAULT_LANGUAGE,
  setLanguage: setLanguageProp,
}: TranslationProviderProps) {
  const t = useCallback(
    (translations: Record<SupportedLanguage, string>) => translations[language],
    [language],
  );

  const setLanguage = useMemo(() => {
    if (setLanguageProp) {
      return setLanguageProp;
    }

    return () => {
      console.warn(
        'setLanguage was called, but no setLanguage function was passed to TranslationProvider',
      );
    };
  }, [setLanguageProp]);

  return (
    <TranslationContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return context;
}
