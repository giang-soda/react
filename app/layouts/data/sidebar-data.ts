import { Command } from 'lucide-react'
import { type SidebarData } from '~/lib/types/nav'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: Command,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: Command,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Command,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: Command,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Command,
        },
        {
          title: 'Secured by Clerk',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Command,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: Command,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: Command,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: Command,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: Command,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: Command,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Command,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: Command,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Command,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Command,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Command,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Command,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: Command,
        },
      ],
    },
  ],
}
