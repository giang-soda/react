import type { User } from '~/models';
import { useBaseListStore } from './base-store';

export const useAdminUserListStore = useBaseListStore<User>();
