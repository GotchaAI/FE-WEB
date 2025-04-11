import { userToken } from "store/auth";

/**
 * 인증 토큰 반환
 * @returns {object} accessToken 및 setAccessToken
 */
const getAuthToken = () => {
  const { accessToken, setAccessToken } = userToken.getState();
  return { accessToken, setAccessToken };
};

/**
 * 토큰 유무 확인
 * @returns true/false
 */
const isAccessToken = async () => {
  const { accessToken } = getAuthToken();
  if (!accessToken) {
    return false;
  }
  return true;
};

export { getAuthToken, isAccessToken };
