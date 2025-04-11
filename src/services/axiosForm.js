import axios from "axios";
import { LOCAL_SERVER_IP } from "constants/api";
import { SIGN_IN_URL } from "constants/url";
import dayjs from "dayjs";
import { tokenReissueAPI } from "services/auth/auth";
import { userToken } from "store/auth";

const baseConfig = {
  baseURL: LOCAL_SERVER_IP,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const tokenInstance = axios.create(baseConfig); // 토큰 인터셉터 적용
const instance = axios.create(baseConfig); // 인터셉터 미적용

tokenInstance.interceptors.request.use(
  async (config) => {
    // JWT_AT : 임시 토큰 발급
    const { accessToken, expireTime, setAccessToken } = userToken.getState();
    const isTokenExpired = expireTime && dayjs().isAfter(dayjs(expireTime));
    console.log(expireTime);
    console.log(dayjs());
    console.log(isTokenExpired);
    if (isTokenExpired || !accessToken) {
      try {
        const res = await tokenReissueAPI();

        const newToken = res.accessToken;
        const newExpireTime = res.expiredAt;
        setAccessToken(newToken, newExpireTime);

        config.headers["Authorization"] = `${newToken}`;
      } catch (error) {
        // 리프레시 토큰 만료, 오류
        console.error("토큰 재발급 실패", error);
        window.location.href = SIGN_IN_URL; // 또는 modal 등 처리 가능
        return Promise.reject(error);
      }
    } else {
      config.headers["Authorization"] = `${accessToken}`;
    }

    return config;
  },
  async (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

tokenInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    // AT 만료
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { setAccessToken } = userToken.getState();
      try {
        const res = await tokenReissueAPI();

        const newAccessToken = res.accessToken;
        setAccessToken(newAccessToken, res.expiredAt);

        // 👉 새 토큰으로 헤더 설정 후 재요청
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `${newAccessToken}`,
        };

        return axios.request(originalRequest);
      } catch (error) {
        window.location.href = SIGN_IN_URL; // 또는 modal 등 처리 가능
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// API 요청 함수 (옵션으로 인터셉터 선택)
export const apiInterface = async (
  method,
  url,
  data = {},
  params = {},
  useToken = true
) => {
  const instanceType = useToken ? tokenInstance : instance;

  try {
    const res = await instanceType({ method, url, data, params });
    return res.data;
  } catch (e) {
    console.error("API 요청 중 오류:", e);
    throw e;
  }
};
