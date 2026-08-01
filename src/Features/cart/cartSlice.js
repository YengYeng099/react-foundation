import { createSlice } from "@reduxjs/toolkit";
const Initialize = {
    totalPrice: 0,
    quantity: 1,
    products:[]
}
export const cartSlice = createSlice({
  name: "cart",
  initialState: Initialize,
  reducers: {
    addToCart: (state, action) => {
      let totalPrice = action.payload.price * state.quantity;
      state.totalPrice += totalPrice;
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      let totalPrice = action.payload.price * state.quantity;
      const item = state.products.find((p)=>p.uuid === action.payload.id);
      if (item) {
        state.totalPrice -= totalPrice;
        
      }
    },
  },
});
export const {addToCart} = cartSlice.actions;
export const {removeFromCart} = cartSlice.actions;
export default cartSlice.reducer