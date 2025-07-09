import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { DataColumn, DataSearch } from '~/models';
import { DataGrid, DeleteModal } from '.';
import { initBaseListStore } from '~/stores/base-store';
import { CheckCircleIcon } from 'lucide-react';

// Example data type
interface ExampleItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  count: number;
  createdAt: string;
  updatedAt: string;
}

// Example data
const exampleData: ExampleItem[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: true,
    count: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: false,
    count: 5,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: true,
    count: 15,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'admin',
    status: true,
    count: 20,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'user',
    status: false,
    count: 8,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '6',
    name: 'Diana Davis',
    email: 'diana@example.com',
    role: 'admin',
    status: true,
    count: 12,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
  },
];

export function DataGridExample() {
  const { t } = useTranslation(['common']);
  const [data, setData] = useState<ExampleItem[]>(exampleData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ExampleItem | null>(null);

  // Initialize store
  const store = initBaseListStore<ExampleItem>();

  // Define columns
  const columns: DataColumn<ExampleItem>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: 'number',
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
      render: (value: React.ReactNode) => {
        return value ? (
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        ) : (
          <span className="text-red-500">Inactive</span>
        );
      },
    },
    {
      key: 'count',
      header: 'Count',
      sortable: 'number',
      searchable: true,
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      searchable: true,
      date: true,
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      sortable: true,
      searchable: true,
      date: true,
    },
  ];

  // Define search filters
  const dataSearch: DataSearch<ExampleItem>[] = [
    {
      key: 'id',
      label: 'ID',
      searchFn: (item: ExampleItem, value: React.ReactNode) => {
        return item.id.includes(value as string);
      },
      type: 'input',
    },
    {
      key: 'name_email',
      label: 'Name or Email',
      searchFn: (item: ExampleItem, value: React.ReactNode) => {
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
      searchFn: (item: ExampleItem, value: React.ReactNode) => {
        return item.role.includes(value as string);
      },
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      searchFn: (item: ExampleItem, value: React.ReactNode) => {
        return (value as boolean) ? item.status : true;
      },
      type: 'checkbox',
    },
    {
      key: 'count',
      label: 'Count',
      searchFn: (item: ExampleItem, value: React.ReactNode) => {
        return item.count === Number(value);
      },
      type: 'input',
    },
  ];

  // Handle delete
  const handleDelete = (item: ExampleItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove item from data
      setData(prev => prev.filter(item => item.id !== itemToDelete.id));
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      setIsError(true);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reload
  const handleReload = () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    
    // Simulate reload
    setTimeout(() => {
      setData(exampleData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">DataGrid Example</h1>
        <p className="text-muted-foreground">
          This is an example of how to use the DataGrid component with responsive layout, filtering, and pagination.
        </p>
      </div>

      <DataGrid
        data={data}
        columns={columns}
        dataSearch={dataSearch}
        store={store}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onReload={handleReload}
        urlCreate="/create"
        urlEdit={(id) => `/edit/${id}`}
        onDelete={handleDelete}
        searchPlaceholder="Search by name, email, or ID..."
        pageSizeOptions={[6, 12, 18, 24]}
      />

      {itemToDelete && (
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onDelete={handleDeleteConfirm}
          title="Delete User"
          description="Are you sure you want to delete this user? This action cannot be undone."
        >
          <div className="mt-4 space-y-2">
            <p><strong>Name:</strong> {itemToDelete.name}</p>
            <p><strong>Email:</strong> {itemToDelete.email}</p>
            <p><strong>ID:</strong> {itemToDelete.id}</p>
          </div>
        </DeleteModal>
      )}
    </div>
  );
} 