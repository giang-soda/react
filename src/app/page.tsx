import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <p>
        <Link href={`/dashboard`}>Dashboard</Link>
      </p>

      <p>
        <Link href={`/login`}>Login</Link>
      </p>

      <Image src="/window.svg" alt="image no" width={180} height={300} />
    </div>
  );
}
