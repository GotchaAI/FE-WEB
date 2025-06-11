import { ROOM_LIST_API, SOCKET_RECONNECT_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getRoomListAPI = async (params) => {
  return await apiInterface("get", ROOM_LIST_API, {}, params, true);
};

export const reconnectAPI = async () => {
  return await apiInterface("get", SOCKET_RECONNECT_API, {}, {}, true);
};
