import dayjs from 'dayjs';
import { csrfTokenStore, userToken } from 'store/auth';

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

const getCsrfToken = () => {
  const { csrfToken } = csrfTokenStore.getState();
  return csrfToken;
};

const setCsrfToken = (csrfToken) => {
  const { setCsrfToken } = csrfTokenStore.getState();
  console.log(csrfToken);
  setCsrfToken(csrfToken);
};

/**
 * 토큰 만료 여부 확인
 * @return true/false
 */
const isTokenExpired = () => {
  const { expireTime } = getAuthToken();
  return expireTime && dayjs().isAfter(dayjs(expireTime));
};

export {
  getAuthToken,
  isAccessToken,
  getCsrfToken,
  setCsrfToken,
  isTokenExpired,
};
