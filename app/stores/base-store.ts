import { create } from 'zustand';
import type { DataSort, AdminListState, AttrListState } from '~/models';
import { PAGE_SIZE } from '~/constans';
import merge from 'lodash/merge';

const initialBaseState = <T>() => ({
  searchTerm: {} as Record<string, React.ReactNode>,
  sortConfig: {} as DataSort<T>,
  pagination: {
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  },
});

export const initBaseListStore = <T>(initialState?: AttrListState<T>) => {
  if (!initialState) {
    initialState = initialBaseState<T>();
  } else {
    initialState = merge(initialBaseState<T>(), initialState);
  }

  return create<AdminListState<T>>(set => ({
    ...initialState,

    reset: () => set(initialState),
    setSearchTerm: (key: string, value: React.ReactNode) =>
      set(state => ({
        searchTerm: {
          ...state.searchTerm,
          [key]: value,
        },
        pagination: {
          pageSize: state.pagination.pageSize,
          pageIndex: 0,
        },
      })),
    setSortConfig: (key: keyof T, sortable?: boolean | string) =>
      set(state => ({
        sortConfig: {
          key,
          direction:
            state.sortConfig.key === key && state.sortConfig.direction === 'asc' ? 'desc' : 'asc',
          type: sortable === 'number' ? 'number' : 'string',
        },
      })),
    setPageIndex: (pageIndex: number) =>
      set(state => ({
        pagination: {
          pageSize: state.pagination.pageSize,
          pageIndex,
        },
      })),
    setPageSize: (pageSize: number) =>
      set(() => ({
        pagination: {
          pageSize,
          pageIndex: 0,
        },
      })),
  }));
};
