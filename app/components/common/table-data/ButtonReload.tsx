import { type QueryKey } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { ACTION } from '~/constans';
import type { QueryResponse } from '~/models';
import { useQueryRefreshKey } from '~/hooks/use-query';

interface ButtonReloadProps<T> {
  refreshQuerykey?: QueryKey;
  queryResponse: QueryResponse<T>;
}

export function ButtonReload<T>({ queryResponse, refreshQuerykey }: ButtonReloadProps<T>) {
  const { t } = useTranslation(['common']);
  const queryRefreshKey = useQueryRefreshKey();
  return (
    <Button
      loading={queryResponse.query.isFetching}
      icon={ACTION.RELOAD}
      onClick={() => {
        queryRefreshKey.call(refreshQuerykey);

        void queryResponse.query.refetch().then(result => {
          if (result.isSuccess) {
            toast.success(t('pagination.reloadSuccess', { ns: 'common' }));
          }
        });
      }}
    >
      {t('pagination.reload', { ns: 'common' })}
    </Button>
  );
}
