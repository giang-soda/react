// src/features/counter/counterSlice.js
import { IRequestList } from '@/lib/helpers/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserListFilter extends IRequestList {
  id?: number;
  name?: string;
  role?: number;
}

const userListFilterSlice = createSlice({
  name: 'userListFilter',
  initialState: {
    limit: 0,
    offset: 0,
    id: undefined,
    name: undefined,
    role: undefined
  } as IUserListFilter,
  reducers: {
    setData: (state, action: PayloadAction<IUserListFilter>) => {
      Object.assign(state, action.payload);
    }
  }
});

// Export actions
export const { setData } = userListFilterSlice.actions;

// Export reducer
export default userListFilterSlice.reducer;
