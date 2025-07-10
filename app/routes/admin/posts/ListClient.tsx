import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import type { loader } from './ListPage';
import { PostList } from '~/components/features/admin/posts/PostList';

export default function PostsListClient() {
  const { t } = useTranslation('users');
  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('post.list.title')}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <PostList data={posts?.list} /> 
      </div>
    </div>
  );
}
