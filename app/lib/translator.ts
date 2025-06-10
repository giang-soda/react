import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from '~/locales/en/auth.json';
import enValidate from '~/locales/en/validate.json';
import enCommon from '~/locales/en/common.json';

import viAuth from '~/locales/vi/auth.json';
import viValidate from '~/locales/vi/validate.json';
import viCommon from '~/locales/vi/common.json';
import { Language } from '~/constans';

void i18n.use(initReactI18next).init({
  lng: Language.EN,
  fallbackLng: Language.EN,
  resources: {
    en: {
      auth: enAuth,
      validate: enValidate,
      common: enCommon,
    },
    vi: {
      auth: viAuth,
      validate: viValidate,
      common: viCommon,
    },
  },
  ns: ['auth', 'validate', 'common'],
  defaultNS: 'common',
});

export default i18n;
