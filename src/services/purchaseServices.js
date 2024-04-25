import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getItemCompanyWise = (company) => {
  return axios.get(
    "http://localhost:9990/distributer/api/v1/public/item/item-by-company",
    company
  );
};

const addPurchase = (data) => {
  return axios.post(
    "http://localhost:9990/distributer/api/v1/public/purchase/add-purchase",
    data
  );
};

const getPurchase = () => {
  return axios.get(
    "http://localhost:9990/distributer/api/v1/public/purchase/get-purchase"
  );
};

const getBillNumber = (invoice) => {
  return axios.put(
    "http://localhost:9990/distributer/api/v1/public/purchase/get-bill", { data: invoice }
  );
};

export const useGetItemCompanyWise = (company) => {
  return useQuery("getItemCompanyWise", getItemCompanyWise, {
    retry: 5,
    retryDelay: 1000,
  });
};

export const useAddPurchase = () => {
  return useMutation("addPurchase", addPurchase, {
    retry: 5,
    retryDelay: 1000,
  });
};

export const useGetPurchaseData = () => {
  return useQuery("getPurchaseData", getPurchase, {
    retry: 5,
    retryDelay: 1000,
  });
};

export const useGetUniqueBillNo = (data) => {
  return useMutation("getPurchaseData", getBillNumber, {
    retry: 5,
    retryDelay: 1000,
  });
};
