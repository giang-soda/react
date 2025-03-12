/**
 * route /dashboard/blog
 */
// import { getPosts } from '@/lib/posts'
import Image from "next/image";
import styles from './styles.module.scss';
import Link from "next/link";

interface IPost {
  id: number;
  productCategoryName: string;
}

const fetchPosts = async (): Promise<Array<IPost>> => {
  const res = await fetch('http://localhost:5000/productCategories', {
    cache: 'no-store',
    next: { revalidate: 0 }
  }).then(r => r.json());
  return res.data;
}

export default async function DashboardBlog() {
  const postDataList = await fetchPosts();

  return (
    <div>
      <Link className="text-lg" href={`/`}>HOME</Link>
      <h1>Blog Post list</h1>
      <Image
      src='/window.svg'
      alt="image no"
      width={180}
      height={300}
      />
      <h2 className={styles['color-red']}>Blog Post list 2 2</h2>
      <h2 className="color-r">Blog red 3</h2>
      
      <span className="pie"><span className="pie-inner p13"></span></span>
      <ul>
        {postDataList.map((post) => (
          <li key={post.id}>
            <Link href={`/dashboard/blog/${post.id}`}>{post.productCategoryName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
