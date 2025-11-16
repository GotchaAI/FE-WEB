import { SERVICE_LIST_API, SERVICE_MY_LIST_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getQnAListAPI = async (params = {}) => {
  return await apiInterface("get", SERVICE_LIST_API, {}, params, false);
};

export const getMyQnAListAPI = async (params = {}) => {
  return await apiInterface("get", SERVICE_MY_LIST_API, {}, params, true);
};