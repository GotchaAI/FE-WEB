import dayjs from "dayjs";
import { userToken } from "store/auth";

/**
 * 인증 토큰 반환
 * @returns {object} accessToken 및 setAccessToken
 */
const getAuthToken = () => {
  const { accessToken, expireTime, setAccessToken } = userToken.getState();
  return { accessToken, expireTime, setAccessToken };
};

/**
 * 토큰 유무 확인
 * @returns true/false
 */
const isAccessToken = () => {
  const { accessToken } = getAuthToken();
  if (!accessToken) {
    return false;
  }
  return true;
};

/**
 * 토큰 만료 여부 확인
 * @return true/false
 */
const isTokenExpired = () => {
  const { expireTime } = getAuthToken();
  return expireTime && dayjs().isAfter(dayjs(expireTime));
};

export { getAuthToken, isAccessToken, isTokenExpired };
