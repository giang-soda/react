import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaAdmin('Editor');

export default function CKeditorPage() {
  return <ClientComponent componentPath="admin/editor/CKeditorClient" />;
}
