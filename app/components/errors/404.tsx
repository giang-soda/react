import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTitle } from '~/hooks/use-title';
import ErrorLayout from './ErrorLayout';
import { useTranslation } from 'react-i18next';

export function Error404() {
  useTitle('404 | Soda');
  const { t } = useTranslation('common');

  return (
    <ErrorLayout>
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="space-y-2">
          <h1 className="text-foreground/90 text-6xl font-bold tracking-tighter">404</h1>
          <h2 className="text-foreground/80 text-2xl font-semibold">{t('errors.404.title')}</h2>
          <p className="text-muted-foreground">{t('errors.404.description')}</p>
        </div>

        <Button>
          <Link to="/" className="flex items-center justify-center">
            {t('actions.goToHome')}
          </Link>
        </Button>
      </div>
    </ErrorLayout>
  );
}
