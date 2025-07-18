import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '~/components/ui/sidebar';
import { NavGroup } from './NavGroup';
import { TeamSwitcher } from './TeamSwitcher';
import { sidebarData } from '../data/sidebar-data';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
