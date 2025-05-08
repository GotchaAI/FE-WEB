import SignUp from "components/auth/SignUp";
import { ROOT_URL } from "constants/url";
import { redirect } from "react-router-dom";
import { signUpAPI, tokenReissueAPI } from "services/auth/auth";
import "styles/pages/auth/SignUpPage.scss";
import { getAuthToken } from "utils/token";

/**
 * 회원가입 페이지 (Root Page)
 *
 * - 회원가입 container를 담당하는 컴포넌트
 *
 * 주요 역할:
 * 1. 회원가입 폼 검증에 따른 에러 메시지 처리
 * 2. <SignUp /> 컴포넌트에 필요한 props 전달
 */

const SignUpPage = () => {
	return (
		<div className="sign-up-page-container">
			<SignUp />
		</div>
	);
};

export default SignUpPage;

/**
 * 회원가입 페이지 접근 전 사용자 인증 상태를 확인하는 loader 함수
 *
 * - accessToken이 존재하면 → 홈(ROOT_URL)으로 리다이렉트 (회원가입 페이지 접근 불필요)
 * - accessToken이 없으면 → tokenReissueAPI()를 통해 재발급 시도
 *   - 재발급 실패 시 → 회원가입 페이지에 그대로 머무름
 *
 * @returns redirect(ROOT_URL) | undefined (회원가입 페이지 유지)
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

	return;
};

/**
 * 회원가입 요청을 처리하는 action 함수
 *
 * - 회원가입 폼 데이터를 추출하여 사용자 회원가입을 시도
 * - 회원가입 성공 시: 액세스 토큰을 저장하고 로비 페이지(ROOT_URL)로 리다이렉트
 * - 회원가입 실패 시: 에러 메시지를 반환하여 UI에서 표시 가능
 *
 * @param {Object} request - 요청 객체 (React Router에서 전달)
 * @returns redirect(ROOT_URL) | errorMessage - 리디렉트 응답 또는 에러 메시지
 */
export const action = async ({ request }) => {
	const data = await request.formData();

	// 회원가입 폼
	const authForm = {
		email: data.get("email"),
		password: data.get("password"),
		passwordCheck: data.get("passwordCheck"),
		nickname: data.get("nickname"),
	};

	// 회원가입 API 요청
	try {
		const res = await signUpAPI(authForm);

		const { setAccessToken } = getAuthToken();
		const accessToken = res.accessToken;
		const expireTime = res.expiredAt;

		// 토큰 저장
		setAccessToken(accessToken, expireTime);
		return redirect(ROOT_URL);
	} catch (e) {
		// 회원가입 에러
		console.error(e);
	}
};
