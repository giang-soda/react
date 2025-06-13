import { Button } from '~/components/ui/button';
import { getTodos, getTodosId, get404, get500, get401 } from '~/api/todos';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Alert, AlertTitle } from '~/components/ui/alert';
import { cn } from '~/lib/utils';

export function meta() {
  return [{ title: 'Call Api' }, { name: 'description', content: 'CallApi' }];
}

enum ELoading {
  list = 'list',
  id = 'id',
  error404 = 'error404',
  error500 = 'error500',
  error500Default = 'error500Default',
  error401 = 'error401',
}

export default function CallApi() {
  const { t } = useTranslation();
  const [response, setResponse] = useState<Record<string, React.ReactNode> | React.ReactNode | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setIsLoading] = useState<ELoading | null>(null);

  const handleTodos = async () => {
    setIsLoading(ELoading.list);
    setResponse(null);
    const todos = await getTodos(t);
    setResponse(todos);
    setIsLoading(null);

    if (typeof todos === 'string') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleTodosId = async () => {
    setIsLoading(ELoading.id);
    setResponse(null);
    const todos = await getTodosId(t, 1);
    setResponse(todos);
    setIsLoading(null);

    if (typeof todos === 'string') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handle404 = async () => {
    setIsLoading(ELoading.error404);
    setResponse(null);
    const error = await get404(t);
    setResponse(error);
    setIsLoading(null);

    if (typeof error === 'string') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handle500 = async () => {
    setIsLoading(ELoading.error500);
    setResponse(null);
    const error = await get500(t);
    setResponse(error);
    setIsLoading(null);

    if (typeof error === 'string') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handle500Default = async () => {
    setIsLoading(ELoading.error500Default);
    setResponse(null);
    const error = await get500(t, 'code_khong_tim_thay');
    setResponse(error);
    setIsLoading(null);

    if (typeof error === 'string') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handle401 = async () => {
    setIsLoading(ELoading.error401);
    setResponse(null);
    const error = await get401(t);
    setResponse(error);
    setIsLoading(null);

    if (typeof error === 'string') { 
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={() => void handleTodos()} loading={loading === ELoading.list} disabled={!!loading}>
          Call List
        </Button>
        <Button onClick={() => void handleTodosId()} loading={loading === ELoading.id} disabled={!!loading}>
          Call Id 1
        </Button>
        <Button onClick={() => void handle404()} loading={loading === ELoading.error404} disabled={!!loading}>
          Call 404
        </Button>
        <Button onClick={() => void handle500()} loading={loading === ELoading.error500} disabled={!!loading}>
          Call 500
        </Button>
        <Button
          onClick={() => void handle500Default()}
          loading={loading === ELoading.error500Default}
          disabled={!!loading}
        >
          Call 500 default
        </Button>
        <Button onClick={() => void handle401()} loading={loading === ELoading.error401} disabled={!!loading}>
          Call 401
        </Button>
      </div>

      <div className="mt-4">
        <Alert className={cn(isError ? 'bg-destructive text-destructive-foreground' : 'bg-green-100 text-green-800')}>
          <AlertTitle>Response <span>{isError ? 'Error' : 'Success'}</span></AlertTitle>
        </Alert>
        
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}
