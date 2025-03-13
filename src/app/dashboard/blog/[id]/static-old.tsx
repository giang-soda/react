import clsx from 'clsx';
import styles from '../styles.module.scss';
import Link from 'next/link';

// interface PostProps {
//   slug: string;
// }

// export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
//   if (!params?.slug) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       slug: params.slug as string, // Ép kiểu về string
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { slug: "1" } }, { params: { slug: "2" } }], // ID phải là string
//     fallback: false,
//   };
// };

/**
 * khi export html static
 */
export async function generateStaticParams() {
  // Danh sách các ID cần tạo tĩnh
  return [{ slug: '1' }, { slug: '2' }];
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  return {
    title: `Blog Post: ${slug}`,
  };
}

interface IPost {
  id: number;
  productCategoryName: string;
}

const fetchPosts = async (): Promise<Array<IPost>> => {
  const res = await fetch('http://localhost:5000/productCategories').then((r) => r.json());
  return res.data;
};

export default async function BlogDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  // export default async function BlogDetail({ slug }: PostProps) {
  // const data = await fetch('https://api.vercel.app/blog').then(r => r.json());
  const { slug } = params;
  const postDataList = await fetchPosts();
  const post = postDataList.find((item) => {
    return item.id == Number(slug);
  });

  return (
    <div className="prose max-w-none">
      <Link className="text-lg" href={`/`}>
        HOME
      </Link>{' '}
      <br />
      <Link className="text-lg" href={`/dashboard/blog`}>
        blog post list
      </Link>
      <h1 className={clsx(post?.id == 1 && styles['color-yellow'])}>Khong the ket noi</h1>
      <h1>{post?.id}</h1>
      <h1>id form param: {slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: String(post?.productCategoryName) }} />
    </div>
  );
}
