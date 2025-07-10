import { metaCommon } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaCommon('403');

export default function Page403() {
  return <ClientComponent componentPath="errors/403Client" />;
}
