import { metaAdmin } from '~/lib/utils';
import ClientComponent from '~/context/ClientComponent';
import { loadDataInfo, loadDataList } from '~/lib/server/loader';
import type { PostData } from '~/models';

export async function loader() {
  return {
    list: loadDataList<PostData>('posts'),
    info: loadDataInfo('posts'),
  };
}

export const meta = ({ data }: { data: Awaited<ReturnType<typeof loader>> }) => {
  return metaAdmin('Posts List', data.info);
};

export default function PostsListPage() {
  return <ClientComponent componentPath="admin/posts/ListClient" />;
}
