import { configureStore } from "@reduxjs/toolkit";
import companyStore from "./CompanySlice"
import itemStore from "./ItemSlice"
import stockStore from "./StockSlice"

export const store = configureStore({
    reducer: {
        company: companyStore,
        items: itemStore,
        stock: stockStore
    }
})