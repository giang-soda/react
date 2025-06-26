import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { ACTION } from '~/constans';
import type { QueryResponse } from '~/models';

interface ButtonReloadProps<T> {
  queryResponse: QueryResponse<T>;
}

export function ButtonReload<T>({ queryResponse }: ButtonReloadProps<T>) {
  const { t } = useTranslation(['common']);

  return (
    <Button
      loading={queryResponse.query.isFetching}
      icon={ACTION.RELOAD}
      onClick={() => {
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
