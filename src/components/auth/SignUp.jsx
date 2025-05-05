import cloudImage from "assets/cloud.png";
import "styles/components/auth/SignUp.scss";
import SignUpForm from "./SignUpForm";

/**
 * 회원가입 컴포넌트
 *
 * - 회원가입 페이지의 시각적 구성과 주요 기능을 담당하는 UI 컴포넌트
 * - 회원가입 폼(SignUpForm), 배경 이미지를 포함
 *
 * props:
 * @param {string} errorMessage - 회원가입 실패 시 출력할 에러 메시지
 *
 * 구성 요소:
 * 1. <SignUpForm />: 실제 회원가입 입력 폼 (닉네임, 비밀번호, 이메일 등)
 * 2. 배경 이미지 (구름 효과)
 */

const SignUp = ({ errorMessage }) => {
	return (
		<div className="sign-in-container">
			<SignUpForm />

			<div className="cloud-container">
				<img className="cloud" src={cloudImage} alt="cloud background" />
			</div>
		</div>
	);
};

export default SignUp;
