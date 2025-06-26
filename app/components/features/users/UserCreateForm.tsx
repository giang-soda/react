
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { PasswordInput } from '~/components/common';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { ACTION, KEY_QUERY } from '~/constans';
import { createPasswordSchema } from '~/lib/validator/password';
import { API_ENDPOINT } from '~/api/endpoint';
import { useApiMutation } from '~/hooks/use-api';
import { toast } from 'sonner';
import type { User } from '~/models';

const formSchema = (tValidate: TFunction) => 
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
    password: createPasswordSchema(tValidate),
  });

type UserCreateSchema = z.infer<ReturnType<typeof formSchema>>;

export function UserCreateForm() {
  const { t } = useTranslation(['common', 'users', 'validate']);
  const form = useForm<UserCreateSchema>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const apiUserPost = useApiMutation<User>(
    {
      method: 'post',
      url: API_ENDPOINT.USERS.CREATE,
    },
    {
      message: {
        default: t('errors.create_default', { ns: 'users' }),
      },
      bodyParamsStruct: {
        email: String,
        name: String,
        password: String,
      },
      querykey: [KEY_QUERY.USER_LIST],
      redirect: '/users',
      onSuccess: (data) => {
        toast.success(t('success.create', { ns: 'users', id: data.id }));
      },
    }
  );

  const onSubmit = () => {
    apiUserPost.mutation.mutate();
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('list.email', { ns: 'users' })}</FormLabel>
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
            <FormItem>
              <FormLabel>{t('list.name', { ns: 'users' })}</FormLabel>
              <FormControl>
                <Input placeholder="Soda name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('list.password', { ns: 'users' })}</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-2 w-fit" loading={apiUserPost.mutation.isPending} icon={ACTION.SAVE}>
          {t('actions.save', { ns: 'common' })}
        </Button>
      </form>
    </Form>
  );
}
