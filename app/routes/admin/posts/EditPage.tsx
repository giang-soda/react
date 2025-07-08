import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaAdmin('User Edit');

export default function UserEditPage() {
  return <ClientComponent componentPath="admin/users/EditClient" />;
}
