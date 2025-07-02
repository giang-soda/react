import type { TFunction } from 'i18next';
import { z } from 'zod';
import { createPasswordSchema } from '~/lib/validator/password';

export const userSchemaValidate = (tValidate: TFunction, passwordRequired = true) =>
  z.object({
    email: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) })
      .email({ message: tValidate('email', { ns: 'validate' }) }),
    name: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) }),
    password: createPasswordSchema(tValidate, { required: passwordRequired }),
  });

export type UserSchema = z.infer<ReturnType<typeof userSchemaValidate>>;
