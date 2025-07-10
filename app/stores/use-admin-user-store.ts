import type { User } from '~/models';
import { initBaseListStore } from './base-store';

export const useAdminUserListStore = initBaseListStore<User>();
