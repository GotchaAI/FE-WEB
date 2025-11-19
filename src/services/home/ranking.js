import { RANKING_API, RANkING_MY_API } from "constants/api";
import { apiInterface } from "services/axiosForm";

export const getRankingListAPI = async (params = {}) => {
  return await apiInterface("get", RANKING_API, {}, params, false);
};

export const getMyRankingAPI = async () => {
  return await apiInterface("get", RANkING_MY_API, {}, {}, true);
};