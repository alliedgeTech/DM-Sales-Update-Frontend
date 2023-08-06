import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getItemCompanyWise = (company) => {
    return axios.get(
      "http://localhost:9990/distributer/api/v1/public/item/item-by-company",
      company
    );
  };
  const addsell = (data) => {
    return axios.post(
      "http://localhost:9990/distributer/api/v1/public/sell/add-sell",
      data
    );
  };
  
  const getsell = () => {
    return axios.get(
      "http://localhost:9990/distributer/api/v1/public/sell/get-sell"
    );
  };
  
  export const useGetItemCompanyWise = (company) => {
    return useQuery("getItemCompanyWise", getItemCompanyWise, {
      retry: 5,
      retryDelay: 1000,
    });
  };
  
  export const useAddSell = (data) => {
    return useMutation("addPurchase", addsell, {
      retry: 5,
      retryDelay: 1000,
    });
  };
  
  export const useGetSellData = () => {
    return useQuery("getPurchaseData", getsell, {
      retry: 5,
      retryDelay: 1000,
    });
  };
    