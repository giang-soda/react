import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTitle } from '~/hooks/use-title';
import ErrorLayout from './ErrorLayout';
import { useTranslation } from 'react-i18next';

export function Error403() {
  useTitle('403 | Soda');
  const { t } = useTranslation('common');

  return (
    <ErrorLayout>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">403</h1>
        <span className="font-medium">{t('errors.403.title')}</span>
        <p className="text-muted-foreground text-center">{t('errors.403.description')}</p>
        <div className="mt-6 flex gap-4">
          <Button>
            <Link to="/" className="flex items-center justify-center">
              {t('actions.goToHome')}
            </Link>
          </Button>
        </div>
      </div>
    </ErrorLayout>
  );
}
