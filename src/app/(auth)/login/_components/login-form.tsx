'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthLogin } from '@/lib/interfaces';
import { Button, TextField } from '@radix-ui/themes';
import { authLogin } from '@/lib/api/client/auth';
import { loginFormValidate } from './login-form-validate';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginForm() {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthLogin>({
    resolver: zodResolver(loginFormValidate),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<IAuthLogin> = async (data) => {
    await authLogin(data);

    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          Email:
          <TextField.Root
            placeholder="email"
            {...register('username')}
            onChange={() => trigger('username')}
          />
          <p>{errors.username?.message}</p>
        </div>

        <div>
          password:
          {/* include validation with required or other standard HTML validation rules */}
          <TextField.Root
            placeholder="password"
            {...register('password')}
            onChange={() => trigger('password')}
          />
          {/* errors will return when field validation fails  */}
          <p>{errors.password?.message}</p>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
