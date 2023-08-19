import axios from "axios"
import { useQuery } from "react-query"

const getStock = () => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/stock/stock")
}

const itemWisePurchaseStock = () => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/stock/purchasestock/"+id)
}
const itemWiseSellStock = () => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/stock/sellstock/"+id)
}

export const useGetStockData = () => {
    return useQuery("getStockData", getStock, {
        retry: 5,
        retryDelay: 1000
    })
}

export const useItemWisePurchaseStockData = () => {
    return useQuery("itemWisePurchaseStockData", itemWisePurchaseStock,{
    retry: 5,
    retryDelay: 1000
  })
}

export const useItemWiseSellStockData = () => {
    return useQuery("useItemWiseSellStockData", itemWiseSellStock,{
    retry: 5,
    retryDelay: 1000
  })
}