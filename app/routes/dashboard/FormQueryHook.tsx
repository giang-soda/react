import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePath } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useApiMutation } from '~/hooks/use-api';
import { API_ENDPOINT } from '~/api';
import { useParams } from 'react-router';

const formSchema = (
  tValidate: (key: string, value?: Record<string, React.ReactNode>) => string
) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) })
      .email({ message: tValidate('email', { ns: 'validate' }) }),
    name: z
      .string()
      .min(1, { message: tValidate('required', { ns: 'validate' }) })
      .max(255, { message: tValidate('max', { max: 255, ns: 'validate' }) }),
  });
};

type UserSchema = z.infer<ReturnType<typeof formSchema>>;

const bodyParamsStruct = {
  email: String,
  name: String,
};

export function FormQueryUpdate() {
  const params = useParams();

  if (!params.id) {
    return <div>Bạn hãy thêm id trên url</div>;
  }

  const { t } = useTranslation(['auth', 'validate', 'todos', 'common']);

  const form = useForm<UserSchema>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const callApiUserPost = useApiMutation(
    {
      method: 'post',
      url: generatePath(API_ENDPOINT.TODOS.UPDATE, { id: params.id }),
    },
    {
      message: {},
    }
  );

  async function onSubmit(data: UserSchema) {
    try {
      // setIsLoading(true);
      console.log(data);
      callApiUserPost.mutation.mutate();

      // await new Promise(resolve => setTimeout(resolve, 3000));
      // if (data.email === 'admin@gmail.com') {
      //   toast.success(t('login.success', { ns: 'auth' }));
      // } else {
      //   throw new Error(t('login.error', { ns: 'auth' }));
      // }
    } catch (error) {
      // console.error('Login failed:', error);
      // toast.error(t('login.error', { ns: 'auth' }));
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          void form.handleSubmit(onSubmit)(e);
        }}
        className="grid gap-5"
      >
        <FormItem>
          <FormLabel>ID</FormLabel>
          <FormControl>
            <Input disabled value={params.id} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('list.email', { ns: 'todos' })}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t('list.name', { ns: 'todos' })}</FormLabel>
              <FormControl>
                <Input placeholder="Soda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" loading={false}>
          {t('actions.submit', { ns: 'common' })}
        </Button>
      </form>
    </Form>
  );
}
