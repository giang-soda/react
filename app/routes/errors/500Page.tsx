import { metaCommon } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaCommon('500');

export default function Page500() {
  return <ClientComponent componentPath="errors/500Client" />;
}
