import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTitle } from '~/hooks/use-title';
import ErrorLayout from './ErrorLayout';
import { useTranslation, Trans } from 'react-i18next';
import { URL_PATH } from '~/constans';

export function Error503() {
  useTitle('503 | Soda');
  const { t } = useTranslation('common');
  return (
    <ErrorLayout>
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <div className="space-y-2">
          <h1 className="text-foreground/90 text-6xl font-bold tracking-tighter">503</h1>
          <h2 className="text-foreground/80 text-2xl font-semibold">{t('errors.503.title')}</h2>
          <p className="text-muted-foreground">
            <Trans i18nKey="errors.503.description" />
          </p>
        </div>
        <div className="flex gap-4">
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
