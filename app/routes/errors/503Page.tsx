import { metaCommon } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export const meta = () => metaCommon('503');

export default function Page503() {
  return <ClientComponent componentPath="errors/503Client" />;
}
