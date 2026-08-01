import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "../Features/counter/CounterSlice";
import { cartSlice } from "../Features/cart/cartSlice";
import { ecommerceApi } from "../components/API/ecommerceApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      Counter: CounterSlice.reducer,
      cart: cartSlice.reducer,
      ecommerceApi: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ecommerceApi.middleware),
  });
};
