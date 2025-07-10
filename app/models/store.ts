import type React from 'react';
import type { DataPagination, DataSort } from './pagination';

export interface AttrListState<T> {
  searchTerm: Record<string, React.ReactNode>;
  sortConfig: DataSort<T>;
  pagination: DataPagination;
}

export interface AdminListState<T> extends AttrListState<T> {
  setSearchTerm: (key: string, value: React.ReactNode) => void;
  setSortConfig: (key: keyof T, sortable?: boolean | string) => void;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}
