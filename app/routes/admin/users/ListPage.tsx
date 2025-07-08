import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaAdmin('User List');

export default function UserListPage() {
  return <ClientComponent componentPath="admin/users/ListClient" />;
}
