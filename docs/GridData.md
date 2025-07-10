# DataGrid Component

DataGrid là một component hiển thị dữ liệu dạng grid responsive với khả năng lọc, sắp xếp và phân trang. Component này được thiết kế để hoạt động với dữ liệu đã được load sẵn (không cần @tanstack/react-query).

## Tính năng

- **Responsive Layout**: 3 cột trên màn hình lớn, 2 cột trên màn hình trung bình, 1 cột trên màn hình nhỏ
- **Lọc dữ liệu**: Hỗ trợ nhiều loại filter (input, select, checkbox) với debounce
- **Sắp xếp**: Click vào tiêu đề để sắp xếp dữ liệu
- **Phân trang**: Điều hướng qua các tập dữ liệu lớn
- **Loading & Error States**: Xử lý trạng thái tải và lỗi
- **Actions**: Hỗ trợ các action như edit, delete, và custom actions
- **Search**: Tìm kiếm toàn bộ hoặc theo từng trường cụ thể

## Sử dụng cơ bản

```tsx
import { DataGrid } from '~/components/common/grid-data';
import type { DataColumn, DataSearch } from '~/models';
import { initBaseListStore } from '~/stores/base-store';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export function UserGrid() {
  const [data, setData] = useState<User[]>([]);
  const store = initBaseListStore<User>();

  const columns: DataColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      searchable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      searchable: true,
      render: (value) => value ? 'Active' : 'Inactive',
    },
  ];

  const dataSearch: DataSearch<User>[] = [
    {
      key: 'name_email',
      label: 'Name or Email',
      searchFn: (item, value) => {
        const searchValue = (value as string).toLowerCase();
        return (
          item.name.toLowerCase().includes(searchValue) ||
          item.email.toLowerCase().includes(searchValue)
        );
      },
      type: 'input',
    },
    {
      key: 'role',
      label: 'Role',
      searchFn: (item, value) => item.role.includes(value as string),
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
  ];

  return (
    <DataGrid
      data={data}
      columns={columns}
      dataSearch={dataSearch}
      store={store}
      urlCreate="/users/create"
      urlEdit={(id) => `/users/edit/${id}`}
      onDelete={(item) => handleDelete(item)}
    />
  );
}
```

## Props

### DataGridProps<T>

```tsx
interface DataGridProps<T> {
  data: T[];                                    // Dữ liệu hiển thị
  columns: DataColumn<T>[];                     // Định nghĩa cột
  store: AdminListState<T>;                     // Store quản lý state
  searchPlaceholder?: string;                   // Placeholder cho input search
  pageSizeOptions?: number[];                   // Tùy chọn kích thước trang
  urlCreate?: string;                           // URL cho nút tạo mới
  urlEdit?: (id: string) => string;             // Hàm URL cho nút chỉnh sửa
  onDelete?: (item: T) => void;                 // Handler xóa
  dataSearch?: DataSearch<T>[];                 // Cấu hình search filters
  itemActions?: (item: T) => React.ReactNode;   // Custom actions cho mỗi item
  debounceDelay?: number;                       // Độ trễ debounce (ms)
  isLoading?: boolean;                          // Trạng thái loading
  isError?: boolean;                            // Trạng thái lỗi
  error?: Error | null;                         // Thông tin lỗi
  onReload?: () => void;                        // Handler reload
}
```

## Responsive Layout

Component sử dụng CSS Grid với các breakpoint sau:

- **Mobile (default)**: 1 cột
- **Medium (md)**: 2 cột  
- **Large (lg)**: 3 cột

```css
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## Search Filters

Hỗ trợ 3 loại filter:

### Input Filter
```tsx
{
  key: 'name',
  label: 'Name',
  type: 'input',
  searchFn: (item, value) => item.name.includes(value as string),
}
```

### Select Filter
```tsx
{
  key: 'role',
  label: 'Role',
  type: 'select',
  options: [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ],
  searchFn: (item, value) => item.role.includes(value as string),
}
```

### Checkbox Filter
```tsx
{
  key: 'status',
  label: 'Active Only',
  type: 'checkbox',
  searchFn: (item, value) => (value as boolean) ? item.status : true,
}
```

## Store Management

Component sử dụng Zustand store để quản lý state:

```tsx
import { initBaseListStore } from '~/stores/base-store';

const store = initBaseListStore<YourType>();
```

Store quản lý:
- Search terms
- Sort configuration
- Pagination state

## Custom Actions

Bạn có thể thêm custom actions cho mỗi item:

```tsx
const itemActions = (item: User) => (
  <Button onClick={() => handleCustomAction(item)}>
    Custom Action
  </Button>
);

<DataGrid
  // ... other props
  itemActions={itemActions}
/>
```

## Loading & Error States

```tsx
<DataGrid
  data={data}
  columns={columns}
  store={store}
/>
```

## Pagination

Pagination được xử lý tự động với các tính năng:
- Hiển thị thông tin "Showing X to Y of Z"
- Tùy chọn page size
- Navigation buttons (Previous/Next)
- Page numbers với ellipsis cho nhiều trang

## Styling

Component sử dụng shadcn/ui components:
- `Card` cho mỗi grid item
- `Input`, `Select`, `Checkbox` cho filters
- `Button` cho actions
- `Pagination` cho navigation

## Example

Xem file `DataGridExample.tsx` để có ví dụ hoàn chỉnh về cách sử dụng component. 