import type { TFunction } from 'i18next';
import { z } from 'zod';

export const ckeditorSchema = (tValidate: TFunction) => z.object({
  title: z
    .string()
    .min(1, { message: tValidate('required', { ns: 'validate' }) })
    .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) })
    .trim(),
  thumbnail: z
    .string()
    .url({ message: tValidate('url', { ns: 'validate' }) })
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val)
});

export type CKeditorFormData = z.infer<ReturnType<typeof ckeditorSchema>>;
