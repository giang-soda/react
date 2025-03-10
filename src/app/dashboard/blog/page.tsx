/**
 * route /dashboard/blog
 */
// import { getPosts } from '@/lib/posts'
import Post from "@/components/post";
import { posts } from "@/lib/posts";
import Image from "next/image";
import windowUrl from "@@/public/window.svg";
import styles from './styles.module.scss';
import Link from "next/link";

export default async function DashboardBlog() {
  const postDataList = posts;

  return (
    <div>
      <Link className="text-lg" href={`/`}>HOME</Link>
      <h1>Blog Post list</h1>
      <Image
      src={windowUrl}
      alt="image no"
      width={180}
      height={300}
      />
      <h2 className={styles['color-red']}>Blog Post list 2 2</h2>
      <h2 className="color-r">Blog red 3</h2>
      
      <span className="pie"><span className="pie-inner p13"></span></span>
      <ul>
        {postDataList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
