import { AppSidebar } from './parts/AppSidebar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';
import { Outlet, useNavigate } from 'react-router';
import { Header } from './parts/Header';
import { Main } from './parts/Main';
import { getToken } from '~/lib/auth';
import { URL_PATH } from '~/constans';
import { useEffect } from 'react';

export default function AdminAppLayout() {
  const token = getToken(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      void navigate(URL_PATH.ADMIN.AUTH.LOGIN);
    }
  }, [token]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div
          id="content"
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <Header />
          <Main>
            <Outlet />
          </Main>
        </div>
      </SidebarProvider>
    </>
  );
}
