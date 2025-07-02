import { metaAdmin } from '~/lib/utils';
import { CKeditor } from '~/components/features/admin/editor/CKeditor';

export const meta = () => metaAdmin('Editor');

export default function CKeditorPage() {
  return <CKeditor />;
}
