import Dashboard from './Dashboard';

export function meta() {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Dashboard' }];
}

export default function Home() {
  return <Dashboard />;
}
