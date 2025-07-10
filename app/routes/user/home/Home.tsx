import { metaCommon } from '~/lib/utils';
import { Home } from '~/components/features/user/home/Home';

export const meta = () => metaCommon('Home');

export default function HomePage() {
  return <Home />;
}
