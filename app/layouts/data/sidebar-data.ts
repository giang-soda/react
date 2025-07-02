import { Command, FilePenLine, User2 } from 'lucide-react';
import { type SidebarData } from '~/lib/types/nav';
import { URL_PATH } from '~/constans';

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: URL_PATH.DASHBOARD,
          icon: Command,
        },
        {
          title: 'User Management',
          url: URL_PATH.USERS.LIST,
          icon: User2,
        },
        {
          title: 'Editor',
          url: URL_PATH.EDITOR.CKEDITOR,
          icon: FilePenLine,
        },
        {
          title: 'Secured by Clerk',
          icon: Command,
          items: [
            {
              title: 'Sign In',
              url: URL_PATH.AUTH.LOGIN,
            },
            {
              title: 'Sign Up',
              url: '#',
            },
            {
              title: 'User Management',
              url: '#',
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
              url: URL_PATH.AUTH.LOGIN,
            },
            {
              title: 'Sign In (2 Col)',
              url: '#',
            },
            {
              title: 'Sign Up',
              url: '#',
            },
            {
              title: 'Forgot Password',
              url: '#',
            },
            {
              title: 'OTP',
              url: '#',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Command,
          items: [
            {
              title: 'Throw Error',
              url: '/throw-error',
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
              url: '#',
              icon: Command,
            },
            {
              title: 'Account',
              url: '#',
              icon: Command,
            },
            {
              title: 'Appearance',
              url: '#',
              icon: Command,
            },
            {
              title: 'Notifications',
              url: '#',
              icon: Command,
            },
            {
              title: 'Display',
              url: '#',
              icon: Command,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/404xxx',
          icon: Command,
        },
      ],
    },
  ],
};
