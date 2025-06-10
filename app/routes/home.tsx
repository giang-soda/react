import Dashboard from './dashboard';

export function meta() {
  return [
    { title: 'Home' },
    { name: 'description', content: 'Home' },
  ];
}

export default function Home() {
  return <Dashboard />;
}
