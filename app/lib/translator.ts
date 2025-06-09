import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from '~/locales/en/auth.json';
import enValidate from '~/locales/en/validate.json';

import viAuth from '~/locales/vi/auth.json';
import viValidate from '~/locales/vi/validate.json';

void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      auth: enAuth,
      validate: enValidate,
    },
    vi: {
      auth: viAuth,
      validate: viValidate,
    },
  },
  ns: ['auth', 'validate'],
  defaultNS: 'auth',
});

export default i18n;
