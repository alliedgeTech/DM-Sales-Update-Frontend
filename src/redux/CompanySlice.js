import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const companySlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        addCompany: (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export const { addCompany } = companySlice.actions;
export default companySlice.reducer;