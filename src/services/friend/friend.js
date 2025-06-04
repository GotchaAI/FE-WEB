import { apiInterface } from "services/axiosForm";

export const getFriendsListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends", {}, {}, true);
};
