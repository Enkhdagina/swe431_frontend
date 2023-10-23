import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISplash {
  // haruulah eseh
  isShow: boolean;
  // uzsen eseh
  isView: boolean;

}

const initialState: ISplash = {
  isShow: false,
  isView: false,

};

export const splashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
     
    },
    setView: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
     
    },
    
  },
});


export const { setView, setShow } = splashSlice.actions;

export const splashReducer = splashSlice.reducer;