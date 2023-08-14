import { configureStore } from "@reduxjs/toolkit";
import companyStore from "./CompanySlice"
import itemStore from "./ItemSlice"
import stockStore from "./StockSlice"
import PurchaseStore from "./PurchaseSlice";

export const store = configureStore({
    reducer: {
        company: companyStore,
        items: itemStore,
        stock: stockStore,
        purchase:PurchaseStore
    }
})