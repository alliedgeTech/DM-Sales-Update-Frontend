import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        addPurchase: (state, action) => {
            action.payload?.forEach((e) => {
                state.value.push(e)
            })
        }
    }
})
export default purchaseSlice.reducer;
export const { addPurchase } = purchaseSlice.actions;