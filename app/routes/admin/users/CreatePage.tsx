import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaAdmin('User Create');

export default function UserCreatePage() {
  return <ClientComponent componentPath="admin/users/CreateClient" />;
}
