import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { Language, KEY_LOCAL_STORAGE } from '~/constans';
import { isEnumValue } from './utils';

const getDefaultLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem(KEY_LOCAL_STORAGE.LANGUAGE);
    if (savedLang && isEnumValue(Language, savedLang)) {
      return savedLang;
    }
  }
  return Language.EN;
};

void i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: getDefaultLanguage(),
    fallbackLng: getDefaultLanguage(),
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    ns: ['auth', 'validate', 'common'],
    defaultNS: 'common',
  });

export default i18n;
