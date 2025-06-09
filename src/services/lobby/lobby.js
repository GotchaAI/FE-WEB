import { ROOM_LIST_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getRoomListAPI = async (params) => {
  return await apiInterface(
    "get",
    ROOM_LIST_API,
    {},
    params,
    true
  );
};
