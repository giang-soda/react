import { metaAdmin } from '~/lib/utils';
import Dashboard from '../dashboard/Dashboard';

export const meta = () => metaAdmin('Home');

export default function AdminHome() {
  return <Dashboard />;
}
