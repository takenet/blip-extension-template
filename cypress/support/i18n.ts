import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../src/assets/locales/en/translation.json';
import esTranslation from '../../src/assets/locales/es/translation.json';
import ptTranslation from '../../src/assets/locales/pt/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    pt: { translation: ptTranslation },
  },
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});
