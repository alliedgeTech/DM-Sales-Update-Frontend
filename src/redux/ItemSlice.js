import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export default itemSlice.reducer;
export const { addItems } = itemSlice.actions;