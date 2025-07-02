import { z } from 'zod';
import type { TFunction } from 'i18next';

export const loginSchemaValidate = (tValidate: TFunction) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) })
      .email({ message: tValidate('email', { ns: 'validate' }) }),
    password: z
      .string()
      .min(6, {
        message: tValidate('min', { min: 6, ns: 'validate' }),
      })
      .max(50, {
        message: tValidate('max', { max: 50, ns: 'validate' }),
      }),
  });
};

export type LoginSchema = z.infer<ReturnType<typeof loginSchemaValidate>>;
