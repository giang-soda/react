import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { EditSubmit, PasswordInput } from '~/components/common';
import { useTranslation } from 'react-i18next';
import { KEY_QUERY, URL_PATH } from '~/constans';
import { API_ENDPOINT } from '~/api/endpoint';
import { useApiMutation } from '~/hooks/use-api';
import { toast } from 'sonner';
import type { User } from '~/models';
import { userSchemaValidate, type UserSchema } from './user-schema';

export function UserCreateForm() {
  const { t } = useTranslation(['common', 'users', 'validate']);
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchemaValidate(t)),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const api = useApiMutation<User>(
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
      refreshQuerykey: [KEY_QUERY.USER_LIST],
      redirect: URL_PATH.ADMIN.USERS.LIST,
      onSuccess: data => {
        toast.success(t('success.create', { ns: 'users', id: data.name }));
      },
    }
  );

  const onSubmit = (data: UserSchema) => {
    api.mutation.mutate(data);
  };

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

        <EditSubmit loading={api.mutation.isPending} backTo={URL_PATH.ADMIN.USERS.LIST} />
      </form>
    </Form>
  );
}
