import { USER_ME_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const testAPI = async () => {
  return await apiInterface("get", USER_ME_API);
};
