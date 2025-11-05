import { apiInterface } from "services/axiosForm";

export const getQnAListAPI = async (params = {}) => {
  return await apiInterface("get", `/api/v1/qnas`, {}, params, false);
};