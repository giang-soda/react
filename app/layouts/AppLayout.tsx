import { AppSidebar } from './parts/AppSidebar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';
import { Outlet } from 'react-router';
import { Header } from './parts/Header';
import { Main } from './parts/Main';

export function meta() {
  return [{ title: 'Soda' }, { name: 'description', content: 'Soda Web App' }];
}

export default function AppLayout() {
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
