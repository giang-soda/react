import type { TFunction } from 'i18next';
import { z } from 'zod';

const PASSWORD_WHITELIST = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
  ALL: /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
};

interface PasswordSchema {
  min?: number;
  max?: number;
  required?: boolean;
}

export const createPasswordSchema = (tValidate: TFunction, passwordSchema?: PasswordSchema) => {
  const { min = 6, max = 50, required = true } = passwordSchema || {};

  return z
    .string()
    .refine(
      val => {
        if (required && val === '') {
          return false;
        }
        return true;
      },
      {
        message: tValidate('required', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        return !/\s/.test(val);
      },
      {
        message: tValidate('password.space', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return val.length >= min;
      },
      {
        message: tValidate('min', { ns: 'validate', min }),
      }
    )
    .refine(
      val => {
        return val.length <= max;
      },
      {
        message: tValidate('max', { ns: 'validate', max }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return PASSWORD_WHITELIST.ALL.test(val);
      },
      {
        message: tValidate('password.symbol', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return PASSWORD_WHITELIST.UPPERCASE.test(val);
      },
      {
        message: tValidate('password.format', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return PASSWORD_WHITELIST.LOWERCASE.test(val);
      },
      {
        message: tValidate('password.format', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return PASSWORD_WHITELIST.NUMBER.test(val);
      },
      {
        message: tValidate('password.format', { ns: 'validate' }),
      }
    )
    .refine(
      val => {
        if (val === '') return true;
        return PASSWORD_WHITELIST.SPECIAL.test(val);
      },
      {
        message: tValidate('password.format', { ns: 'validate' }),
      }
    )
    .transform(val => (val === '' ? undefined : val))
    .optional();
};
