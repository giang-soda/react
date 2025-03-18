import { z } from 'zod';

export const loginFormValidate = z.object({
  username: z
    .string()
    .nonempty()
    .refine((val) => {
      console.log('ccc');
      return val.length > 6;
    }, 'Min 6 length'),
  password: z
    .string()
    .nonempty()
    .refine((val) => {
      console.log('ggggg');
      return val.length > 5;
    }, 'Min 5 length'),
});
