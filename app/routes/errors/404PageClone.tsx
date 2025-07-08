import { metaCommon } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaCommon('404');

export default function Page404Clone() {
  return <ClientComponent componentPath="errors/404Client" />;
}
