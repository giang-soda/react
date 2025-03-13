import Link from 'next/link';

export default function Post({ post }: { post: { id: number; content: string } }) {
  return (
    <li key={post.id} className="mb-4">
      <p className="text-lg">{post.id}</p>
      <Link className="text-lg" href={`/dashboard/blog/${post.id}`}>
        {post.content}
      </Link>
    </li>
  );
}
