import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { loader } from './ListPage';
// import PostTable from '~/components/features/admin/posts/PostTable';

export default function PostsListClient() {
  const { t } = useTranslation('posts');
  const posts = useLoaderData<typeof loader>();
  console.log('posts', posts);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('list.title')}</h1>
      </div>
      <div className="flex flex-col gap-4">
        {posts?.map(post => (
          <div key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
