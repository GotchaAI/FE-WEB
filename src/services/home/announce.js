import { ANNOUNCE_LIST_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getAnnounceListAPI = async (params = {}) => {
  return await apiInterface("get", ANNOUNCE_LIST_API, {}, params, false);
};

export const getAnnounceDetailAPI = async (notificationId) => {
  return await apiInterface("get", `${ANNOUNCE_LIST_API}/${notificationId}`, {}, {}, false);
};