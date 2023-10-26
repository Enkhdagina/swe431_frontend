import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBasket {
  ids: string[]
  

}

const initialState: IBasket = {
    ids: []
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // in 
    updateBasket: (state, action: PayloadAction<string>) => {
        state.ids.find((id) => id == action.payload) != undefined ? state.ids = state.ids.filter((id) => id != action.payload) : state.ids.push(action.payload) ;
        
    },
    
    // start
    setBasket: (state, action: PayloadAction<string[]>) => {
        state.ids = action.payload
    }
  
    
  },
});


export const { setBasket, updateBasket } = basketSlice.actions;

export const basketReducer = basketSlice.reducer;