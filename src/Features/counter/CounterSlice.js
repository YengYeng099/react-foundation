import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0 // Initialize value
}
export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers : {
        // increment
        increment : (state,payload) => {
        state.count += 1;
        },
        decrement : (state,payload) => {
            state.count == 0 ? state.count = 0 : state.count -=1
        }
    }
})

export const { increment, decrement} = CounterSlice.actions;
export default CounterSlice.reducer;