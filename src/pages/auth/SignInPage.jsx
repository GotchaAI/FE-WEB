import SignIn from "components/auth/SignIn";
import { SIGN_IN_FAILURE_ERROR_MESSAGE } from "constants/errorMessage";
import { ROOT_URL } from "constants/url";
import { redirect, useActionData } from "react-router-dom";
import { guestSignInAPI, signInAPI, tokenReissueAPI } from "services/auth/auth";
import "styles/pages/auth/SignInPage.scss";
import { getAuthToken } from "utils/token";

/**
 * 로그인 페이지 (Root Page)
 *
 * - 로그인 container를 담당하는 컴포넌트
 * - action 함수로부터 전달된 에러 메시지(useActionData)를 받아 하위 컴포넌트에 전달(오류 메세지)
 *
 * 주요 역할:
 * 1. 로그인 결과에 따른 에러 메시지 처리
 * 2. <SignIn /> 컴포넌트에 필요한 props 전달
 */

const SignInPage = () => {
  const errorMessage = useActionData();

  return (
    <div className="sign-in-page-container">
      <SignIn errorMessage={errorMessage} />
    </div>
  );
};

export default SignInPage;

/**
 * 로그인 페이지 접근 전 사용자 인증 상태를 확인하는 loader 함수
 *
 * - accessToken이 존재하면 → 홈(ROOT_URL)으로 리다이렉트 (로그인 페이지 접근 불필요)
 * - accessToken이 없으면 → tokenReissueAPI()를 통해 재발급 시도
 *   - 재발급 성공 시 → 홈(ROOT_URL)으로 리다이렉트
 *   - 재발급 실패 시 → 로그인 페이지에 그대로 머무름
 *
 * @returns redirect(ROOT_URL) | undefined (로그인 페이지 유지)
 */
export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();

  if (!accessToken) {
    // 토큰 재발급
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const expireTime = res.expiredAt;
      setAccessToken(newAccessToken, expireTime);
    } catch (e) {
      // 토큰 없으면 페이지 유지
      return;
    }
  }

  // 토큰 없으면 홈페이지 이동
  return redirect(ROOT_URL);
};

/**
 * 로그인 요청을 처리하는 action 함수
 *
 * - 로그인 폼 데이터를 추출하여 사용자 로그인 또는 게스트 로그인을 시도
 * - 로그인 성공 시: 액세스 토큰을 저장하고 로비 페이지(LOBBY_URL)로 리다이렉트
 * - 로그인 실패 시: 에러 메시지를 반환하여 UI에서 표시 가능
 *
 * @param {Object} request - 요청 객체 (React Router에서 전달)
 * @returns redirect(ROOT_URL) | errorMessage - 리디렉트 응답 또는 에러 메시지
 */
export const action = async ({ request }) => {
  const data = await request.formData();

  // 로그인 폼
  const authForm = {
    email: data.get("email"),
    password: data.get("password"),
    autoSignIn: data.get("autoSignin"),
  };

  // 로그인 타입(user/guest)
  const requestType = data.get("sign-in-type");

  // 로그인 API 요청
  try {
    const res = await (requestType === "user"
      ? signInAPI(authForm)
      : guestSignInAPI());

    const { setAccessToken } = getAuthToken();
    const accessToken = res.accessToken;
    const expireTime = res.expiredAt;

    // 토큰 저장
    setAccessToken(accessToken, expireTime);
    return redirect(ROOT_URL);
  } catch (e) {
    // 로그인 에러
    console.error(e);
    return SIGN_IN_FAILURE_ERROR_MESSAGE;
  }
};
