import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./reducers/productReducer";
import themeReducer from "./reducers/themeModeReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

export const createStore = () => {
  return configureStore({
    reducer: { productReducer, themeReducer, userReducer, cartReducer},
  });
}

export const store = createStore()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
