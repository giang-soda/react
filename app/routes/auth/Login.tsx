import { LoginForm } from '~/components/features/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useTranslation } from 'react-i18next';

export function meta() {
  return [{ title: 'Login | Soda' }, { name: 'description', content: 'Login to your account' }];
}

export default function Login() {
  const { t } = useTranslation(['auth']);
  return (
    <>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg tracking-tight">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}
