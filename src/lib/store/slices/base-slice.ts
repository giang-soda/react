import { Any, IBase } from '@/lib/helpers/interfaces';
import { PayloadAction } from '@reduxjs/toolkit';

const baseSlice = (initialState: IBase) => {
  return {
    updateStore: (state: Any, action: PayloadAction<IBase>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetStore: () => initialState,
  };
};

export default baseSlice;
