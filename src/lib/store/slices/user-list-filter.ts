// src/features/counter/counterSlice.js
import { PAGER } from '@/lib/constants/common';
import { IRequestList } from '@/lib/helpers/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import baseSlice from './base-slice';

export interface IUserListFilter extends IRequestList {
  id?: number;
  name?: string;
  role?: number;
}

const initialState: IUserListFilter = {
  limit: PAGER.limit,
  offset: PAGER.offset,
  id: undefined,
  name: undefined,
  role: undefined,
};

const userListFilterSlice = createSlice({
  name: 'userListFilter',
  initialState,
  reducers: {
    ...baseSlice(initialState),
  },
});

export const { updateStore, resetStore } = userListFilterSlice.actions;

export default userListFilterSlice.reducer;
