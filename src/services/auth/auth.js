import {
  CSRF_TOKEN_API,
  GUEST_SIGN_IN_API,
  SIGN_IN_API,
  TOKEN_REISSUE_API,
} from "constants/api";
import { apiInterface } from "services/axiosForm";

export const signInAPI = async (authForm) => {
  return await apiInterface("post", SIGN_IN_API, authForm, {}, false);
};

export const guestSignInAPI = async () => {
  return await apiInterface("post", GUEST_SIGN_IN_API, {}, {}, false);
};

export const tokenReissueAPI = async () => {
  return await apiInterface("post", TOKEN_REISSUE_API, {}, {}, false);
};

export const csrfTokenGetAPI = async () => {
  return await apiInterface("get", CSRF_TOKEN_API, {}, {}, false);
};
