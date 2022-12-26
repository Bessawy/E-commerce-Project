import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productReducer from "./reducers/productReducer";
import themeReducer from "./reducers/themeModeReducer";

export const store = configureStore({
  reducer: { productReducer, themeReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
