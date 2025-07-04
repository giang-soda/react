import { useNavigate } from 'react-router';
import { metaAdmin } from '~/lib/utils';
import { removeDataLogout } from '~/lib/auth';
import { URL_PATH } from '~/constans';
import { useEffect } from 'react';

export const meta = () => metaAdmin('Logout');

export default function LogoutPage() {
  removeDataLogout(true);
  const navigate = useNavigate();

  useEffect(() => {
    void navigate(URL_PATH.ADMIN.AUTH.LOGIN);
  }, []);

  return null;
}
