import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { IframeMessageProxy } from 'iframe-message-proxy';
import enTranslation from '../../assets/locales/en/translation.json';
import esTranslation from '../../assets/locales/es/translation.json';
import ptTranslation from '../../assets/locales/pt/translation.json';

i18n
  .use(initReactI18next)
  .use({
    type: 'languageDetector',
    async: true,
    detect: async (callback: (language: string) => void) => {
      const { response } = (await IframeMessageProxy.sendMessage({
        action: 'getCurrentLanguage',
      })) as { response: string | undefined };

      const fallback = 'pt';
      const language = response ?? fallback;
      const isSupported = ['en', 'es', 'pt'].includes(language);

      callback(isSupported ? language : fallback);
    },
  })
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof enTranslation;
    };
  }
}

export default i18n;
