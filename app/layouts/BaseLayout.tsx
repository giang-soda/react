import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '~/context/ThemeContext';
import { ThemeLayout } from './ThemeLayout';
import config from '~/config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: config.DEV ? false : 2,
      staleTime: 1000 * 60 * 10, // time ms to refetch
      gcTime: 1000 * 60 * 10, // time ms to clear
    },
  },
});

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeLayout>{children ?? <Outlet />}</ThemeLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
