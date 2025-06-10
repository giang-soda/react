import { Outlet } from 'react-router';
import { Footer } from './parts/Footer';

export function meta() {
  return [
    { title: 'Soda' },
    { name: 'description', content: 'Soda Web App' },
  ]
}

export default function AuthLayout() {
  return (
    <div className="bg-primary-foreground flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto flex w-full flex-col space-y-2 py-8 sm:w-[480px] sm:p-8">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-xl font-medium">Soda</h1>
          </div>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}
