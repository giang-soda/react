import { metaAdmin } from '~/lib/utils';

export const meta = () => metaAdmin('Dashboard');

export default function Dashboard() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div>Welcome to the dashboard</div>
    </div>
  );
}
