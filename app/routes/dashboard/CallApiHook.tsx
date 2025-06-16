import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { cn } from '~/lib/utils';
import { useApi, type IUseApiResponse } from '~/hooks/use-api';
import { API_ENDPOINT } from '~/api';
import { generatePath } from 'react-router';

export function meta() {
  return [{ title: 'Call Api Hook' }, { name: 'description', content: 'CallApiHook' }];
}

export default function CallApiHook() {
  const { t } = useTranslation('todos');

  const apiTodoList = useApi(
    {
      method: 'get',
      url: API_ENDPOINT.TODOS.LIST,
    },
    {
      message: {
        default: t('errors.default'),
        ERR_TODO_LIST: t('errors.ERR_TODO_LIST'),
      },
    }
  );

  const apiTodoId = useApi(
    {
      method: 'get',
      url: generatePath(API_ENDPOINT.TODOS.ID, { id: 1 }),
    },
    {
      message: {
        default: t('errors.default'),
        ERR_TODO_LIST: t('errors.ERR_TODO_LIST'),
      },
    }
  );

  const api404 = useApi(
    {
      method: 'get',
      url: API_ENDPOINT.FAKE_ERROR.PAGE_404,
    },
    {
      message: {
        default: t('errors.default'),
        ERR_TODO_LIST: t('errors.ERR_TODO_LIST'),
      },
    }
  );

  const handleCallApi = (api: IUseApiResponse) => {
    apiTodoList.resetData();
    apiTodoId.resetData();
    api404.resetData();
    void api.call();
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={() => handleCallApi(apiTodoList)} loading={apiTodoList.isLoading}>
          Call List
        </Button>
        <Button onClick={() => handleCallApi(apiTodoId)} loading={apiTodoId.isLoading}>
          Call Id 1
        </Button>
        <Button onClick={() => handleCallApi(api404)} loading={api404.isLoading}>
          Call 404
        </Button>
      </div>

      <div className="mt-4">
        <Alert
          className={cn(
            apiTodoList.error
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-green-100 text-green-800'
          )}
        >
          <AlertTitle>
            Response <span>{apiTodoList.error ? 'Error' : 'Success'}</span>
          </AlertTitle>
        </Alert>

        <pre>{JSON.stringify(apiTodoList.data, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <Alert
          className={cn(
            apiTodoId.error
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-green-100 text-green-800'
          )}
        >
          <AlertTitle>
            Response <span>{apiTodoId.error ? 'Error' : 'Success'}</span>
          </AlertTitle>
        </Alert>

        <pre>{JSON.stringify(apiTodoId.data, null, 2)}</pre>
      </div>

      <div className="mt-4">
        <Alert
          className={cn(
            api404.error
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-green-100 text-green-800'
          )}
        >
          <AlertTitle>
            Response <span>{api404.error ? 'Error' : 'Success'}</span>
          </AlertTitle>
        </Alert>

        <pre>{JSON.stringify(api404.data || api404.error, null, 2)}</pre>
      </div>
    </div>
  );
}
