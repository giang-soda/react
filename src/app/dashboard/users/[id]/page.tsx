import { usersDetail } from '@/lib/api/server/users';
import { Metadata } from 'next';
import Head from 'next/head';

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * store cache fetcher
 */
async function getPost(id: number) {
  const res = await usersDetail(id);
  return res;
}

export async function generateMetadata(props: IPageProps): Promise<Metadata> {
  const { id } = await props.params;
  const user = await getPost(Number(id));
  const title = user.mail;

  return {
    title: title,
    description: `User: ${title}`,
  };
}

export default async function DashboardBlogDetail(props: IPageProps) {
  const { id } = await props.params;
  const user = await getPost(Number(id));
  const title = user.mail;

  return (
    <>
      <Head>
        <title>gggggggg</title>
        <meta name="description" content="Server-side title example" />
      </Head>
      <h1>Server side Compoent</h1>
      <p>TITLE User {title}</p>
      <p>id: {user.id}</p>
      <p>last name: {user.lastName}</p>
      <p>first name: {user.firstName}</p>
      <p>role: {user.role}</p>
      <p>
        mail: <span dangerouslySetInnerHTML={{ __html: String(user.mail) }}></span>
      </p>
    </>
  );
}
