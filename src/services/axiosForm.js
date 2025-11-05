import axios from 'axios';
import { LOCAL_SERVER_IP } from 'constants/api';
import {
  CSRF_TOKEN_NOT_FOUND,
  REFRESH_TOKEN_EXPIRED,
} from 'constants/errorCode';
import { SIGN_IN_URL } from 'constants/url';
import { csrfTokenRequestAPI, tokenReissueAPI } from 'services/auth/auth';
import { getAuthToken, isTokenExpired, setCsrfToken } from 'utils/token';

const baseConfig = {
  baseURL: LOCAL_SERVER_IP,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const multipartConfig = {
  baseURL: LOCAL_SERVER_IP,
  timeout: 3000,
  headers: {
    // "Content-Type": "multipart/form-data",  // 브라우저가 자동으로 붙여줌
  },
  withCredentials: true,
};

const tokenInstance = axios.create(baseConfig); // 토큰 인터셉터 적용
const instance = axios.create(baseConfig); // 인터셉터 미적용
const multipartInstance = axios.create(multipartConfig);

function attachCsrfTokenInterceptors(instance) {
  // --- Response 인터셉터: csrf토큰 에러 시 재발급 후 요청 ---
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 403 &&
        error.response?.data.code === CSRF_TOKEN_NOT_FOUND
      ) {
        try {
          const res = await csrfTokenRequestAPI();
          const csrfToken = res.csrfToken;
          setCsrfToken(csrfToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            'X-XSRF-TOKEN': `${csrfToken}`,
          };
          return axios.request(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    },
  );
}

function attachTokenInterceptors(instance) {
  // --- Request 인터셉터: Access Token이 만료되었으면 재발급 ---
  instance.interceptors.request.use(
    async (config) => {
      const { accessToken, setAccessToken } = getAuthToken();
      const isExpired = isTokenExpired();

      if (isExpired || !accessToken) {
        try {
          // 토큰 재발급 호출
          const res = await tokenReissueAPI();
          const newToken = res.accessToken;
          const newExpireTime = res.expiredAt;
          setAccessToken(newToken, newExpireTime);

          config.headers['Authorization'] = `${newToken}`;
        } catch (error) {
          console.error('토큰 재발급 실패', error);
          window.location.href = SIGN_IN_URL;
          return Promise.reject(error);
        }
      } else {
        config.headers['Authorization'] = `${accessToken}`;
      }

      return config;
    },
    (error) => {
      console.error('Request 인터셉터 에러:', error);
      return Promise.reject(error);
    },
  );

  // --- Response 인터셉터: Access Token 만료(401) 시 재시도 ---
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // AT가 만료됐고, REFRESH_TOKEN_EXPIRED 에러가 아닌 경우
      if (
        error.response?.status === 401 &&
        error.response?.data.code !== REFRESH_TOKEN_EXPIRED
      ) {
        const { setAccessToken } = getAuthToken();
        try {
          // 토큰 재발급 재시도
          const res = await tokenReissueAPI();
          const newAccessToken = res.accessToken;
          setAccessToken(newAccessToken, res.expiredAt);

          // 원래 요청 헤더에 새 토큰 세팅 후 재요청
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `${newAccessToken}`,
          };

          return axios.request(originalRequest);
        } catch (err) {
          window.location.href = SIGN_IN_URL;
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    },
  );
}
attachCsrfTokenInterceptors(instance);
attachTokenInterceptors(tokenInstance);
attachTokenInterceptors(multipartInstance);
// API 요청 함수 (옵션으로 인터셉터 선택)
export const apiInterface = async (
  method,
  url,
  data = {},
  params = {},
  useToken = true,
) => {
  const instanceType = useToken ? tokenInstance : instance;
  try {
    const res = await instanceType({ method, url, data, params });
    return res.data;
  } catch (e) {
    console.error('API 요청 중 오류:', e);
    throw e;
  }
};

// API 요청 함수 (multipart 전용)
export const multipartApiInterface = async (
  method,
  url,
  data = {},
  params = {},
) => {
  try {
    const res = await multipartInstance({ method, url, data, params });
    return res.data;
  } catch (e) {
    console.error('API 요청 중 오류:', e);
    throw e;
  }
};
