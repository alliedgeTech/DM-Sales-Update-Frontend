import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

const StockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        addStock: (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export default StockSlice.reducer;
export const { addStock } = StockSlice.actions;