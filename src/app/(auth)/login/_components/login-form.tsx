'use client'

import { FormEvent } from 'react';
import { useForm, SubmitHandler  } from "react-hook-form";
import { IAuthLogin } from '@/lib/interfaces';
import { Button, TextField } from '@radix-ui/themes';
import { authLogin } from '@/lib/api/client/auth';

export default function LoginForm() {
  const { register, getValues, reset, handleSubmit, formState: { errors }, } = useForm<IAuthLogin>();
  const onSubmit: SubmitHandler<IAuthLogin> = async (data) => {
    const res = await authLogin(data);
    console.log(222, res);
  }

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const email = formData.get('email');
  //   const password = formData.get('password');

  //   const response = await fetch('/api/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (response.ok) {
  //     router.push('/profile');
  //   } else {
  //     // Handle errors
  //   }
  // }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div>
        Email: 
      <TextField.Root placeholder="email" {...register("username", { required: true })} />
      {errors.username && <span>This field is required</span>}
      </div>
      

      <div>
        password: 
      {/* include validation with required or other standard HTML validation rules */}
      <TextField.Root placeholder="password" {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}
      </div>

      <Button type='submit'>Submit</Button>
    </form>
    </>
  );
}
