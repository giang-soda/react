import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { BASE_URL } from '~/constans';
import { metaCommon } from '~/lib/utils';
import { Home } from '~/components/features/user/home/Home';

export const meta = () => metaCommon('Home');

export default function HomePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = params.get('redirect');

  useEffect(() => {
    if (redirectUrl) {
      void navigate(BASE_URL + redirectUrl.replace(/^[/]*/g, ''));
    }
  }, [navigate, redirectUrl]);

  if (redirectUrl) {
    return null;
  }

  return <Home />;
}
