import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';
import { loadDataDetail, loadDataInfo } from '~/lib/server/loader';
import type { PostData } from '~/models';
import { ErrorResponseHandler } from '~/lib/errors';
import config from '~/config';
import { URL_PATH } from '~/constans';

export async function loader({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const detail = loadDataDetail<PostData>('posts', slug);

  if (!detail || !detail.title) {
    throw new ErrorResponseHandler(404);
  }

  return {
    detail,
    info: loadDataInfo('posts', {
      'canonical': {
        href: config.VITE_HOST + URL_PATH.ADMIN.POSTS.DETAIL(slug),
      },
      'description': {
        content: detail.shortContent,
      },
      'og:title': {
        content: detail.title,
      },
      'og:description': {
        content: detail.shortContent,
      },
      'og:image': {
        content: detail.thumbnail,
      },
      'og:url': {
        content: config.VITE_HOST + URL_PATH.ADMIN.POSTS.DETAIL(slug),
      },
      'twitter:title': {
        content: detail.title,
      },
      'twitter:description': {
        content: detail.shortContent,
      },
      'twitter:image': {
        content: detail.thumbnail,
      },
    }),
  };
}

export const meta = ({ data }: { data: Awaited<ReturnType<typeof loader>> }) => {
  return metaAdmin(data.detail.title, data.info);
};

export default function PostDetailPage() {
  return <ClientComponent componentPath="admin/posts/DetailClient" />;
}
