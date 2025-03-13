import Link from 'next/link';

export default function SideBar() {
  return (
    <div className="p-8 pb-20">
      <Link className="text-lg pr-10" href={`/`}>
        HOME
      </Link>

      <Link className="text-lg pr-10" href={`/dashboard`}>
        Dashboard
      </Link>

      <Link className="text-lg pr-10" href={`/dashboard/blog`}>
        Blog
      </Link>

      <Link className="text-lg pr-10" href={`/about`}>
        page static: about
      </Link>
    </div>
  );
}
