import { isRouteErrorResponse, Outlet } from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { ErrorBoundaryHandler } from '~/components/errors/ErrorBoundaryHandler';
import BaseLayout from './layouts/BaseLayout';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export default function App() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    return <ErrorBoundaryHandler error={error} />;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
