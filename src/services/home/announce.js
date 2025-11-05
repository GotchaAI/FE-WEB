import { apiInterface } from "services/axiosForm";

export const getAnnounceListAPI = async (params = {}) => {
  return await apiInterface("get", "/api/v1/notifications", {}, params, false);
};