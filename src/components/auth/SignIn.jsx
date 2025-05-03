import cloudImage from "assets/cloud.png";
import logoImage from "assets/commons/logo.png";
import SignInForm from "components/auth/SignInForm";
import { ACCOUNT_URL, SIGN_UP_URL } from "constants/url";
import { Link } from "react-router-dom";
import "styles/components/auth/SignIn.scss";

/**
 * 로그인 컴포넌트
 *
 * - 로그인 페이지의 시각적 구성과 주요 기능을 담당하는 UI 컴포넌트
 * - 상단 로고, 로그인 폼(SignInForm), 회원가입/비밀번호 찾기 네비게이션, 배경 이미지를 포함
 *
 * props:
 * @param {string} errorMessage - 로그인 실패 시 출력할 에러 메시지
 *
 * 구성 요소:
 * 1. 로고 이미지
 * 2. <SignInForm />: 실제 로그인 입력 폼 (이메일, 비밀번호, 자동로그인 등)
 * 3. 계정 관련 네비게이션 링크 (회원가입 / 비밀번호 찾기)
 * 4. 배경 이미지 (구름 효과)
 */

const SignIn = ({ errorMessage }) => {
  return (
    <div className="sign-in-container">
      <img src={logoImage} className="logo" alt="logo" />

      <SignInForm errorMessage={errorMessage} />

      <div className="account-nav-container">
        <Link to={SIGN_UP_URL} className="sign-up-nav-btn">
          회원가입
        </Link>
        <Link to={ACCOUNT_URL} className="find-password-nav-btn">
          비밀번호를 잊어버렸어요!
        </Link>
      </div>

      <div className="cloud-container">
        <img className="cloud" src={cloudImage} alt="cloud background" />
      </div>
    </div>
  );
};

export default SignIn;
