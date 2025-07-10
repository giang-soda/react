import { Error404 } from './404';
import { Error403 } from './403';
import { Error500 } from './500';
import { Error503 } from './503';
import type { ErrorResponse } from 'react-router';
import BaseLayout from '~/layouts/BaseLayout';

interface IErrorProps {
  error: ErrorResponse | Response;
}

export function ErrorBoundaryHandler({ error }: IErrorProps) {
  let component;
  switch (error.status) {
    case 404:
      component = <Error404 />;
      break;
    case 503:
      component = <Error503 />;
      break;
    case 403:
      component = <Error403 />;
      break;
    default:
      component = <Error500 />;
      break;
  }

  return <BaseLayout>{component}</BaseLayout>;
}
