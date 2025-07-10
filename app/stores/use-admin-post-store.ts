import type { AttrListState, PostData } from '~/models';
import { initBaseListStore } from './base-store';

export const useAdminPostListStore = initBaseListStore<PostData>({
  pagination: {
    pageSize: 12,
  },
} as AttrListState<PostData>);
