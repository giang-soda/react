import type React from 'react';

export interface DataSort<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
  type?: 'number' | 'string' | 'date';
}

export interface DataPagination {
  pageIndex: number;
  pageSize: number;
}

export interface DataColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean | string;
  searchable?: boolean;
  date?: boolean;
  render?: (value: React.ReactNode, item?: T) => React.ReactNode;
}

export interface DataSearch<T> {
  key: string;
  label: string;
  searchFn?: (item: T, value: React.ReactNode) => boolean;
  searchable?: boolean;
  type?: 'input' | 'select' | 'date' | 'checkbox';
  options?: {
    value: string;
    label: string;
  }[];
}
