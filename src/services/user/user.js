import { NICKNAME_CHECK_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getUserInfoAPI = async () => {
  return await apiInterface("get", "/api/v1/users/me/main-info", {}, {}, true);
};

export const checkNicknameDuplicateAPI = async (nickname) => {
  return await apiInterface(
    "post",
    NICKNAME_CHECK_API,
    { nickname: nickname },
    {},
    false
  );
};
