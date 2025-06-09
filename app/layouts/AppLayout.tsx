import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Main } from './Main'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
// import { TopNav } from '~/components/layout/top-nav'
// import { ProfileDropdown } from '~/components/profile-dropdown'
// import { Search } from '~/components/search'
// import { ThemeSwitch } from '~/components/theme-switch'
// import { Overview } from './components/overview'
// import { RecentSales } from './components/recent-sales'
import { cn } from '~/lib/utils'
import { Outlet } from 'react-router'

export default function AppLayout() {
  // const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <>
      <SidebarProvider>
        {/* <SkipToMain /> */}
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  )
}