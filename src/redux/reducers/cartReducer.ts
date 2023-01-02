import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartType, ProductType } from "../../Types/product";

const initalstate: CartType[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initalstate,
  
  reducers: {
    addtoCart: (state, actions: PayloadAction<ProductType>) => {
      const indx = state.findIndex((item) => item.id === actions.payload.id);
      if (indx === -1) {
        state.push({ ...actions.payload, count: 1 });
      } else {
        state[indx].count += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      if (state[action.payload].count > 1) {
        state[action.payload].count -= 1;
      } else {
        state.splice(action.payload, 1);
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addtoCart, removeFromCart } = cartSlice.actions;
export default cartReducer;
