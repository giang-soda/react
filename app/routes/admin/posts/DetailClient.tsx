import { useLoaderData } from 'react-router';
import type { loader } from './DetailPage';
import { PostDetail } from '~/components/features/admin/posts/PostDetail';
import { ErrorResponseHandler } from '~/lib/errors';

export default function PostDetailClient() {
  const { detail } = useLoaderData<typeof loader>();

  return (
    <div>
      <PostDetail post={detail} />
    </div>
  );
}
