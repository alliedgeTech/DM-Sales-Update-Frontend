import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        addClient: (state, action) => {
            action.payload.forEach(element => {
                state.value.push(element);
            });
        }
    }
})

export default clientSlice.reducer;
export const { addClient } = clientSlice.actions;