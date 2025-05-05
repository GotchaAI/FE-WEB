import SignUp from "components/auth/SignUp";
import "styles/pages/auth/SignUpPage.scss";

/**
 * 회원가입 페이지 (Root Page)
 *
 * - 회원가입 container를 담당하는 컴포넌트
 * - action 함수로부터 전달된 에러 메시지(useActionData)를 받아 하위 컴포넌트에 전달(오류 메세지)
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
