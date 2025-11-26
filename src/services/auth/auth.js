import {
  CSRF_TOKEN_API,
  EMAIL_SEND_API,
  EMAIL_VERIFY_API,
  GUEST_SIGN_IN_API,
  SIGN_IN_API,
  SIGN_OUT_API,
  SIGN_UP_API,
  TOKEN_REISSUE_API,
} from 'constants/api';
import { apiInterface } from 'services/axiosForm';

export const signUpAPI = async (authForm) => {
  return await apiInterface('post', SIGN_UP_API, authForm, {}, false);
};

export const signInAPI = async (authForm) => {
  return await apiInterface('post', SIGN_IN_API, authForm, {}, false);
};

export const signOutAPI = async () => {
  return await apiInterface('get', SIGN_OUT_API, {}, {}, true);
};

export const guestSignInAPI = async () => {
  return await apiInterface('post', GUEST_SIGN_IN_API, {}, {}, false);
};

export const tokenReissueAPI = async () => {
  return await apiInterface('post', TOKEN_REISSUE_API, {}, {}, false);
};

export const sendEmailCodeAPI = async (email) => {
  return await apiInterface(
    'post',
    EMAIL_SEND_API,
    { email: email },
    {},
    false,
  );
};

export const verifyEmailCodeAPI = async (email, code) => {
  return await apiInterface(
    'post',
    EMAIL_VERIFY_API,
    { email, code },
    {},
    false,
  );
};

export const csrfTokenRequestAPI = async () => {
  return await apiInterface('get', CSRF_TOKEN_API, {}, {}, false);
};
