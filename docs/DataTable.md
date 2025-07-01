# DataTable Component

A reusable table component that provides filtering, sorting, and pagination functionality with debounced search.

## Features

- **Debounced Filtering**: Search with configurable delay to reduce typing events
- **Sorting**: Click column headers to sort data
- **Pagination**: Navigate through large datasets
- **Custom Actions**: Add edit, delete, or custom buttons per row
- **Loading States**: Built-in loading and error handling
- **Responsive**: Works on mobile and desktop

## Basic Usage

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
      sortable: true,
      searchable: true,
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
    },
  ];

  return (
    <DataTable
      queryResponse={api}
      columns={columns}
      searchPlaceholder="Search users..."
      debounceDelay={300} // 300ms delay for search
    />
  );
}
```

## Advanced Usage with Actions

```tsx
import { DataTable } from '~/components/common/table-data';
import type { DataColumn } from '~/models';
import { Button } from '~/components/ui/button';
import { EditIcon } from 'lucide-react';

export function UserTable() {
  const api = useApiQuery<User[]>({...});

  const columns: DataColumn<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      searchable: true,
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
    },
  ];

  const handleDelete = (user: User) => {
    // Handle delete logic
  };

  const rowActions = (user: User) => (
    <Button variant="outline" size="icon">
      <EditIcon className="h-4 w-4" />
    </Button>
  );

  return (
    <DataTable
      queryResponse={api}
      columns={columns}
      searchPlaceholder="Search users..."
      refreshQuerykey={['users']}
      urlCreate="/users/create"
      urlEdit={(id) => `/users/${id}/edit`}
      onDelete={handleDelete}
      rowActions={rowActions}
      debounceDelay={500} // 500ms delay for search
    />
  );
}
```

## Column Configuration

### DataColumn<T>

```tsx
type DataColumn<T> = {
  key: keyof T; // Property key from your data type
  header: string; // Display name for the column
  sortable?: boolean; // Enable sorting (default: false)
  searchable?: boolean; // Enable searching (default: false)
  render?: (value: any, item: T) => React.ReactNode; // Custom render function
};
```

### Custom Column Rendering

```tsx
const columns: DataColumn<User>[] = [
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value, item) => (
      <span
        className={`rounded px-2 py-1 ${value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'createdAt',
    header: 'Created',
    sortable: true,
    render: value => new Date(value).toLocaleDateString(),
  },
];
```

## Props

### DataTableProps<T>

```tsx
interface DataTableProps<T> {
  queryResponse: QueryResponse<T[]>; // API query response
  columns: DataColumn<T>[]; // Column definitions
  searchPlaceholder?: string; // Search input placeholder
  pageSizeOptions?: number[]; // Page size options (default: [10, 20, 30, 40, 50])
  refreshQuerykey?: QueryKey; // Query key for refresh button
  urlCreate?: string; // URL for create button
  urlEdit?: (id: string) => string; // URL function for edit button
  onDelete?: (item: T) => void; // Delete handler
  rowActions?: (item: T) => React.ReactNode; // Custom row action buttons
  debounceDelay?: number; // Search debounce delay in ms (default: 300)
}
```

## Features

### Debounced Filtering

- **Configurable Delay**: Set custom debounce delay (default: 300ms)
- **Performance**: Reduces filtering operations while typing
- **Real-time Input**: Shows typed text immediately
- **Delayed Search**: Applies search filter after user stops typing

### Sorting

- Click column headers to sort
- Toggle between ascending and descending
- Visual indicators show current sort state

### Pagination

- Configurable page sizes
- Smart pagination with ellipsis for large datasets
- Shows current page and total results

### Loading States

- Built-in loading spinner
- Error handling with user-friendly messages
- Empty state when no data is available

### Responsive Design

- Mobile-friendly layout
- Responsive pagination controls
- Flexible column widths

## Best Practices

1. **Debounce Delay**: Use 300-500ms for optimal user experience
2. **Column Keys**: Use unique, descriptive keys for your columns
3. **Searchable Columns**: Only mark columns as searchable if they contain meaningful searchable text
4. **Sortable Columns**: Enable sorting for columns that make sense to sort (IDs, names, dates, etc.)
5. **Custom Rendering**: Use the render function for complex data display (dates, status badges, etc.)
6. **Actions**: Keep row actions minimal and use the actions prop for bulk operations
7. **Performance**: The component handles client-side filtering and sorting efficiently with debouncing
