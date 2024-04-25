import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const SellSlice = createSlice({
    name: "sell",
    initialState,
    reducers: {
        addSell: (state, action) => {
            action.payload.forEach(element => {
                state.value.push(element);
            });
        }
    }
})

export default SellSlice.reducer;
export const { addSell } = SellSlice.actions;