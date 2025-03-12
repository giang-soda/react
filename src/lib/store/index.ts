import { configureStore } from '@reduxjs/toolkit'
import userListFilterSlice from './slices/user-list-filter';

const store = configureStore({
  reducer: {
    userListFilter: userListFilterSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
