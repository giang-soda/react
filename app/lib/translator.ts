import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { Language, KEY_LOCAL_STORAGE } from '~/constans';
import { isEnumValue } from './utils';
import { stripBasename } from '~/lib/url';
import { getItem } from './local-storage';

const getDefaultLanguage = () => {
  if (typeof window === 'undefined') {
    return Language.EN;
  }

  const savedLang = getItem(KEY_LOCAL_STORAGE.LANGUAGE);
  if (savedLang && isEnumValue(Language, savedLang)) {
    return savedLang;
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
      loadPath: stripBasename('/locales/{{lng}}/{{ns}}.json'),
    },

    ns: ['common', 'auth', 'validate', 'users', 'todos'],

    defaultNS: 'common',
  });

export default i18n;
