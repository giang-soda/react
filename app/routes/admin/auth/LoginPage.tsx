import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaAdmin('Login');

export default function LoginPage() {
  return <ClientComponent componentPath="admin/auth/LoginClient" />;
}
