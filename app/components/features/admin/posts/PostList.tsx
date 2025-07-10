import type { DataColumn, DataSearch, PostData } from '~/models';
import { DataGrid } from '~/components/common/grid-data';
import { useAdminPostListStore } from '~/stores/use-admin-post-store';
import { Link } from 'react-router';

export function PostList({ data }: { data: PostData[] }) {
  const store = useAdminPostListStore();
  const dataVisible = data.map(item => ({
    ...item,
    id: item.slug,
  }));

  // Define columns
  const columns: DataColumn<PostData>[] = [
    {
      key: 'slug',
      header: 'Slug',
      sortable: true,
      searchable: true,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      searchable: true,
    },
    {
      key: 'thumbnail',
      header: 'Thumbnail',
      sortable: true,
      searchable: true,
    },
    {
      key: 'content',
      header: 'Content',
      sortable: true,
      searchable: true,
    }
  ];

  // Define search filters
  const dataSearch: DataSearch<PostData>[] = [
    {
      key: 'title',
      label: 'Title',
      type: 'input',
    },
  ];

  const renderGridItem = (item: PostData) => {
    return (
      <div key={String(item.id)} className="h-full">
        <h1 className="text-lg font-bold">
          <Link to={`/admin/posts/${item.slug}`}>{item.title}</Link>
        </h1>
        <div className="space-y-2">
          <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
          <p className="text-sm text-muted-foreground">
            {item.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <DataGrid
        data={dataVisible}
        columns={columns}
        dataSearch={dataSearch}
        store={store}
        renderGridItem={renderGridItem}
      /> 
    </div>
  );
}
