import axios from "axios"
import { useQuery } from "react-query"

const getItemCompanyWise = (company) => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/item/item-by-company", company)
}

export const useGetItemCompanyWise = (company) => {
    return useQuery("getItemCompanyWise", getItemCompanyWise, {
        retry: 5,
        retryDelay: 1000
    })
}