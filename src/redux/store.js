import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "../Features/counter/CounterSlice";
import { cartSlice } from "../Features/cart/cartSlice";
import { productApi } from "../components/API/ecommerceApi";
import { authApi } from "../components/API/authApi";
import { authSlice } from "../Features/auth/AuthSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      Counter: CounterSlice.reducer,
      cart: cartSlice.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [authSlice.reducerPath] : authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
};
