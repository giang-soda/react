import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTitle } from '~/hooks/use-title';
import ErrorLayout from './ErrorLayout';
import { useTranslation } from 'react-i18next';
import { URL_PATH } from '~/constans';

export function Error500() {
  useTitle('500 | Soda');
  const { t } = useTranslation('common');

  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <ErrorLayout>
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="space-y-2">
          <h1 className="text-foreground/90 text-6xl font-bold tracking-tighter">500</h1>
          <h2 className="text-foreground/80 text-2xl font-semibold">{t('errors.500.title')}</h2>
          <p className="text-muted-foreground">{t('errors.500.description')}</p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={handleRefresh}>
            {t('actions.refreshPage')}
          </Button>
          <Button>
            <Link to={URL_PATH.HOME} className="flex items-center justify-center">
              {t('actions.goToHome')}
            </Link>
          </Button>
        </div>
      </div>
    </ErrorLayout>
  );
}
