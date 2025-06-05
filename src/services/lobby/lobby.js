import { ROOM_LIST_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getRoomListAPI = async (gameType, difficulty) => {
  return await apiInterface(
    "get",
    ROOM_LIST_API,
    {},
    {
      gameType: gameType,
      difficulty: difficulty,
    },
    true
  );
};
