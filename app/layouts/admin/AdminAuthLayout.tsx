import { Link, Outlet } from 'react-router';
import { Footer } from '../parts/Footer';
import { URL_PATH } from '~/constans';

export default function AdminAuthLayout() {
  return (
    <div className="bg-primary-foreground flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto flex w-full flex-col space-y-2 py-8 sm:w-[480px] sm:p-8">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-xl font-medium">
              <Link to={URL_PATH.ADMIN.HOME}>Soda</Link>
            </h1>
          </div>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}
