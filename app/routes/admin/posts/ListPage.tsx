import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';

export async function loader() {
  return [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Content 2',
    },
  ];
}

export const meta = ({ data }: { data: Awaited<ReturnType<typeof loader>> }) => {
  return metaAdmin('Posts List - ' + data[0].title, [
    {
      property: 'og:title',
      content: data[0].title,
    },
    {
      name: 'description',
      content: data[0].content,
    },
  ]);
};

export default function PostsListPage() {
  return <ClientComponent componentPath="admin/posts/ListClient" />;
}
