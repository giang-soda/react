import SideBar from '@/components/common/sidebar';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../loading';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
