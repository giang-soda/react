import { useTranslation } from 'react-i18next';

export function NoData() {
  const { t } = useTranslation('common');

  return <div className="flex items-center justify-center py-12">{t('pagination.nodata')}</div>;
}
