import { apiInterface } from "services/axiosForm";

export const getFriendsListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends", {}, {}, true);
};

export const getFriendsRequsetListAPI = async () => {
  return await apiInterface("get", "/api/v1/friends/request", {}, {}, true);
};

export const addFriendAPI = async (nickname) => {
  console.log(nickname);
  return await apiInterface(
    "post",
    `/api/v1/friends/request`,
    { nickname },
    {},
    true
  );
};

export const acceptFriendRequestAPI = async (id) => {
  console.log(id);
  return await apiInterface(
    "post",
    `/api/v1/friends/accept/${id}`,
    {},
    {},
    true
  );
};

export const rejectFriendRequestAPI = async (id) => {
  console.log(id);
  return await apiInterface(
    "post",
    `/api/v1/friends/reject/${id}`,
    {},
    {},
    true
  );
};

export const deleteFriendAPI = async (uuid) => {
  return await apiInterface("delete", `/api/v1/friends/${uuid}`, {}, {}, true);
};

export const searchFriendAPI = async (keyword) => {
  return await apiInterface(
    "get",
    `/api/v1/friends/search`,
    {},
    { keyword },
    true
  );
};
