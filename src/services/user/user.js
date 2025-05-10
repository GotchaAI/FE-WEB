import { NICKNAME_CHECK_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const checkNicknameDuplicateAPI = async (nickname) => {
    return await apiInterface("post", NICKNAME_CHECK_API, { nickname: nickname }, {}, false);
};