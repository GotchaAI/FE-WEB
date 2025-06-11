import { ROOM_LIST_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getRoomDetailAPI = async (roomId) => {
  console.log(roomId);
  return await apiInterface("get", `${ROOM_LIST_API}/${roomId}`, {}, {}, true);
};
