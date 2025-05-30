import { NICKNAME_CHECK_API, USER_ME_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getUserInfoAPI = async () => {
  return await apiInterface("get", USER_ME_API, {}, {}, true);
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
