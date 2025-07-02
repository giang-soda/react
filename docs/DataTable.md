# Component DataTable

DataTable: lọc, sắp xếp và phân trang ở phía client, lấy toàn bộ dữ liệu từ API, sau đó thực thi logic ở client.

## Tính năng

- **Lọc với Debounce**: Tìm kiếm với độ trễ có thể cấu hình để giảm số tìm kiếm khi typing liên tục
- **Sắp xếp**: Nhấp vào tiêu đề cột để sắp xếp dữ liệu
- **Phân trang**: Điều hướng qua các tập dữ liệu lớn
- **Trạng thái tải**: Tích hợp sẵn loading và xử lý lỗi
- **Responsive**: Hoạt động trên mobile và desktop

## Sử dụng cơ bản

```tsx
import { DataTable } from '~/components/common/table-data';
import type { DataColumn } from '~/models';
import { useApiQuery } from '~/hooks/use-api';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserTable() {
  const api = useApiQuery<User[]>(
    {
      method: 'get',
      url: '/api/users',
    },
    {
      querykey: ['users'],
    }
  );

  const columns: DataColumn<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: 'number', // sort number để chính xác tuyệt đối thay vì sort string
      searchable: true, // nếu có DataSearch, thì trường này ko cần khai báo
    },
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
      render: (value, user) => {
        // option, hiển thị nội dung custom, thay vì chỉ hiện giá trị value
        return value + 1;
      },
    },
  ];

  const handleSearch: DataSearch<User>[] = [
    {
      key: 'id',
      label: 'ID',
      type: 'input',
      searchFn: (item: User, value: React.ReactNode) => {
        return item.id.includes(value as string);
      },
    },
    {
      key: 'role',
      label: t('list.role', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return item.role.includes(value as string);
      },
      type: 'select',
      options: [
        { value: 'admin', label: t('role.admin', { ns: 'users' }) },
        { value: 'user', label: t('role.user', { ns: 'users' }) },
      ],
    },
    {
      key: 'status',
      label: t('list.status', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return (value as boolean) ? item.status : true;
      },
      type: 'checkbox',
    },
  ];

  return (
    <DataTable
      queryResponse={api}
      columns={columns}
      onSearch={handleSearch}
      refreshQuerykey={[KEY_QUERY.USER_LIST]} // option query refresh khi ấn button reload
      urlCreate={URL_PATH.USERS.CREATE} // option, button chuyển sang link create
      urlEdit={URL_PATH.USERS.EDIT} // option, button chuyển sang trang edit
      onDelete={handleDelete} // option, button action delete
      pageSizeOptions={[10, 20]} // option, default [10,20,50], số lượng bản ghi hiển thị
      rowActions={React.ReactNode} // option, action của mỗi hàng, sau button edit và delete
    />
  );
}
```

## Props

### DataTableProps<T>

```tsx
interface DataTableProps<T> {
  queryResponse: QueryResponse<T[]>; // Phản hồi query API
  columns: DataColumn<T>[]; // Định nghĩa cột
  searchPlaceholder?: string; // Placeholder cho input tìm kiếm
  pageSizeOptions?: number[]; // Tùy chọn kích thước trang (mặc định: [10, 20, 30, 40, 50])
  refreshQuerykey?: QueryKey; // Query key cho nút refresh
  urlCreate?: string; // URL cho nút tạo mới
  urlEdit?: (id: string) => string; // Hàm URL cho nút chỉnh sửa
  onDelete?: (item: T) => void; // Handler xóa
  rowActions?: (item: T) => React.ReactNode; // Nút hành động tùy chỉnh cho mỗi hàng
  debounceDelay?: number; // Độ trễ debounce tìm kiếm tính bằng ms (mặc định: 300)
}
```
