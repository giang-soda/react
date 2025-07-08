import { LoginForm } from '~/components/features/admin/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useTranslation } from 'react-i18next';
import { metaAdmin } from '~/lib/utils';

export const meta = () => metaAdmin('Login');

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
