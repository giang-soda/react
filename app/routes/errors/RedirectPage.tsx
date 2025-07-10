// redirect page for githubpages

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { URL_PATH } from '~/constans/url-path';
import { metaCommon } from '~/lib/utils';

export const meta = () => metaCommon('Redirect');

export default function RedirectPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = params.get('path');

  useEffect(() => {
    if (redirectUrl) {
      void navigate(URL_PATH.HOME + redirectUrl.replace(/^[/]*/g, ''));
    }
  }, [navigate, redirectUrl]);

  if (redirectUrl) {
    return null;
  }

  return 'redirecting...';
}
