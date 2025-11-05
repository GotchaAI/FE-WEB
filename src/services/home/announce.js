import { apiInterface } from "services/axiosForm";

export const getAnnounceListAPI = async (params = {}) => {
  return await apiInterface("get", "/api/v1/notifications", {}, params, false);
};

export const getAnnounceDetailAPI = async (notificationId) => {
  return await apiInterface("get", `/api/v1/notifications/${notificationId}`, {}, {}, false);
};