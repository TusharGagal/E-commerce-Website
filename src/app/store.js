import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product-List/ProductSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
