import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { loader } from './ListPage';
// import PostTable from '~/components/features/admin/posts/PostTable';

export default function PostsListClient() {
  const { t } = useTranslation('posts');
  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('list.title')}</h1>
      </div>
      <div className="flex flex-col gap-4">
        {posts?.list?.map(post => (
          <div key={post.slug}>
            <p>Slug: {post.slug}</p>
            <p>Title: {post.title}</p>
            <p>Thumbnail: {post.thumbnail}</p>
            <p>Content: {post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
