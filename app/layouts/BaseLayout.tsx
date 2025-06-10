import { ThemeProvider } from '~/context/ThemeContext';
import { ThemeLayout } from './ThemeLayout';
import { Outlet } from 'react-router';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeLayout>{children ?? <Outlet />}</ThemeLayout>
    </ThemeProvider>
  );
}
