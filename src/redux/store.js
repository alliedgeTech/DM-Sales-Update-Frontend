import { configureStore } from "@reduxjs/toolkit";
import companyStore from "./CompanySlice"
import itemStore from "./ItemSlice"

export const store = configureStore({
    reducer: {
        company: companyStore,
        items: itemStore
    }
})