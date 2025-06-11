import { GAME2_EVALUATE_API, GAME2_START_API, GAME2_TASK_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const startGame2API = async () => {
  return await apiInterface(
    "get",
    GAME2_START_API,
    {},
    {},
    true
  );
};

export const fetchPromptAPI = async (gameId) => {
  return await apiInterface(
    "get",
    `${GAME2_TASK_API}/${gameId}`,
    {},
    {},
    true
  );
};

export const evaluateDrawingAPI = async (gameId, imageURL) => {
  return await apiInterface(
    "post",
    `${GAME2_EVALUATE_API}/${gameId}`,
    { imageURL },
    {},
    true
  );
};