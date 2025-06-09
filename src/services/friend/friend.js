import { apiInterface } from "services/axiosForm";

export const getFriendsListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends", {}, {}, true);
};

export const getFriendsRequsetListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends/request", {}, {}, true);
};

export const deleteFriendAPI = async (uuid) => {
  return await apiInterface("delete", `/api/v1/friends/${uuid}`, {}, {}, true);
};
