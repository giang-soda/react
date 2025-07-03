import { Navigate } from 'react-router';
import { metaAdmin } from '~/lib/utils';
import { removeDataLogout } from '~/lib/auth';
import { URL_PATH } from '~/constans';

export const meta = () => metaAdmin('Logout');

export default function LogoutPage() {
  removeDataLogout(true);

  return <Navigate to={URL_PATH.ADMIN.AUTH.LOGIN} />;
}
