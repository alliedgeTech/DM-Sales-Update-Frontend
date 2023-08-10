import axios from "axios";
import { useMutation, useQuery } from "react-query";

const getVendorDataFromDb = () => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/vendor/getvendor")
}

const postVendorData = (vendor) => {
    return axios.post("http://localhost:9990/distributer/api/v1/public/vendor/addvendor", vendor)
}

const getVendorById = (id) => {
    return axios.get("http://localhost:9990/distributer/api/v1/public/vendor/vendor/" + id)
}

const UpdateVendor = async (data) => {
    return await axios.put("http://localhost:9990/distributer/api/v1/public/vendor/vendor/" + data.id, data.data)
}

const deleteVendor = (id) => {
    return axios.delete("http://localhost:9990/distributer/api/v1/public/vendor/vendor/" + id)
}

export const usevendorData = () => {

    return useQuery("getVendor", getVendorDataFromDb, {
        retry: 5,
        retryDelay: 1000
    })
}

export const usePostvendorData = () => {
    return useMutation("postData", postVendorData, {})
}
export const useEditVendor = (id, vendor) => {
    return useMutation("getVendorById", UpdateVendor, {
        retry: 5,
        retryDelay: 2000
    })
}
export const useVendorData = () => {

    return useQuery("getClient", getVendorDataFromDb, {
        retry: 5,
        retryDelay: 2000
    })
}
export const useDeleteVendor = (id) => {
    return useMutation("deleteClient", deleteVendor, {
        retry: 5,
        retryDelay: 2000
    })
}

