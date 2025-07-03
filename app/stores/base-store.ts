import { create } from 'zustand';
import type { DataSort, AdminListState, AttrListState } from '~/models';
import { PAGE_SIZE } from '~/constans';

const initialBaseState = {
  searchTerm: {} as Record<string, React.ReactNode>,
  sortConfig: {} as DataSort<any>,
  pagination: {
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  },
};

export const useBaseListStore = <T>(initialState?: AttrListState<T>) => {
  if (!initialState) {
    initialState = initialBaseState;
  }

  return create<AdminListState<T>>((set) => ({
  ...initialState,

  reset: () => set(initialState),
  setSearchTerm: (key: string, value: React.ReactNode) => set((state) => ({
    searchTerm: {
      ...state.searchTerm,
      [key]: value
    },
    pagination: {
      pageSize: state.pagination.pageSize,
      pageIndex: 0,
    }
  })),
  setSortConfig: (key: keyof T, sortable?: boolean | string) => set((state) => ({
    sortConfig: {
      key,
      direction: state.sortConfig.key === key && state.sortConfig.direction === 'asc' ? 'desc' : 'asc',
      type: sortable === 'number' ? 'number' : 'string',
    }
  })),
  setPageIndex: (pageIndex: number) => set((state) => ({
    pagination: {
      pageSize: state.pagination.pageSize,
      pageIndex
    }
  })),
  setPageSize: (pageSize: number) => set((state) => ({
    pagination: {
      pageSize,
      pageIndex: 0,
    }
    })),
  }));
};
