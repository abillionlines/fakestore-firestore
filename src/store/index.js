/*
Redux store
- Configures the Redux Toolkit store and registers reducers (currently `cart`).
- Exported `store` is provided to the app via `<Provider>` in `main.jsx`.
*/

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
