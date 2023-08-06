import axios from "axios"
import { useQuery } from "react-query"

const getStock = () => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/stock/stock")
}

export const useGetStockData = () => {
    return useQuery("getStockData", getStock, {
        retry: 5,
        retryDelay: 1000
    })
}