import { apiInterface } from "services/axiosForm";

export const getFreindsListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends", {}, {}, true);
};
