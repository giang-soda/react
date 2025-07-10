import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
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
import { toast } from 'sonner';
import { loginSchemaValidate, type LoginSchema } from './login-schema';
import { useApiMutation } from '~/hooks/use-api';
import { API_ENDPOINT } from '~/api/endpoint';
import { URL_PATH } from '~/constans';
import { saveToken } from '~/lib/auth';
import type { User } from '~/models';

export function LoginForm() {
  const { t } = useTranslation(['auth', 'validate']);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemaValidate(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const api = useApiMutation<User[]>(
    {
      method: 'get',
      url: API_ENDPOINT.ADMIN.AUTH.LOGIN,
    },
    {
      message: {
        default: t('errors.login_default', { ns: 'auth' }),
      },
      bodyParamsStruct: {
        email: String,
        password: String,
      },
      redirect: URL_PATH.ADMIN.HOME,
      onSuccess: (response, request) => {
        // TODO: save token demo
        if (response.length === 0) {
          throw new Error(t('errors.login_default', { ns: 'auth' }));
        }

        saveToken(new Date().getTime() + '' + ((request?.email as string) || ''), true);
        toast.success(t('login.success', { ns: 'auth' }));
      },
    }
  );

  const onSubmit = (data: LoginSchema) => {
    api.mutation.mutate({
      ...data,
      rewriteAxiosOption: {
        url: API_ENDPOINT.ADMIN.AUTH.LOGIN + '?email=' + data.email,
      } as unknown as React.ReactNode,
    });
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
              <FormLabel>{t('login.email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t('login.password')}</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
              >
                {t('login.forgotPassword')}
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2" loading={api.mutation.isPending}>
          {t('login.button')}
        </Button>
      </form>
    </Form>
  );
}
