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

const getFilterData = (data) => {
  return axios.get(
    "http://localhost:9990/distributer/api/v1/public/sell/search", {
    params: data
  }
  );
};

const deletesell = (id) => {
  return axios.delete("http://localhost:9990/distributer/api/v1/public/sell/deletesell/" + id)
}

const datewisesellbill = (data) => {
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/datewisesellitem", data)
}
const datewisesellprice = (data) => {
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/datewisesellprice", data)
}

const updateDebitMoney = (data) => {
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/update-money", data)
}
const ChangeDate = (data) => {
  console.log("data--->",data);
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/updateaddmoneydate",data)
}

const getPriceHistory = () => {
  return axios.get("http://localhost:9990/distributer/api/v1/public/sell/get-price-history");
}

const getsellBillNumber = ({number,date}) => {
  console.log("this is i got the data : ",number,date);
  return axios.put(
    "http://localhost:9990/distributer/api/v1/public/sell/get-sellbill", { data: {number,date} }
  );
};

const datewiseaddmoney = (data) => {
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/get-datewiseaddmoney", data)
}

const MYWiseAddMoney = (data) => {
  return axios.put("http://localhost:9990/distributer/api/v1/public/sell/get-between", data)
}


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

export const useDeleteSell = (id) => {
  return useMutation("deleteClient", deletesell, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useUpdateDebitMoney = () => {
  return useMutation("updateClient", updateDebitMoney, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useChangeDate = () => {
  return useMutation("changedate", ChangeDate, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useDateWiseSellBill = (data) => {
  return useMutation("datewisesell", datewisesellbill, {
    retry: 5,
    retryDelay: 1000
  })
}
export const useDateWiseSellBillprice = (data) => {
  return useMutation("datewisesell", datewisesellprice, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useGetSellPriceHistory = () => {
  return useQuery("sellPriceHistory", getPriceHistory, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useGetUniqueBillNo = (data) => {
  return useMutation("getsellbillData", getsellBillNumber, {
    retry: 5,
    retryDelay: 1000,
  });
};

export const useDateWiseAddMoney = (data) => {
  return useMutation("datewisesell", datewiseaddmoney, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useMYWiseAddMoney = (data) => {
  return useMutation("datewisesell", MYWiseAddMoney, {
    retry: 5,
    retryDelay: 1000
  })
}

export const useGetFilterdData = (data) => {
  return useQuery("getSearchedData", getFilterData, {
    retry: 5,
    retryDelay: 1000
  })
}
