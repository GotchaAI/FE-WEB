import useSignInForm from "hooks/auth/useSignInForm";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import "styles/components/auth/SignInForm.scss";

/**
 * SignInForm 컴포넌트
 *
 * - 로그인 입력 폼을 구성하고 로그인 시 필요한 사용자 입력을 처리
 * - 이메일/비밀번호 입력, 아이디 저장, 자동 로그인 설정, 로그인/게스트 로그인 버튼 포함
 *
 * props:
 * @param {string} errorMessage - 로그인 실패 시 출력할 에러 메시지
 * @param {string} savedEmail - localStorage에서 불러온 저장 이메일 (있을 경우 입력란에 자동 세팅)
 *
 * 내부 상태:
 * - emailSave: "아이디 저장" 버튼 상태 (선택 시 localStorage에 저장)
 * - autoSignin: "자동 로그인" 버튼 상태 (hidden input으로 전송)
 *
 * 주요 기능:
 * 1. 이메일/비밀번호 입력 관리 (useSignInForm 훅 사용)
 * 2. "아이디 저장" 버튼 클릭 시 localStorage에 이메일 저장 또는 삭제
 * 3. "자동 로그인" 버튼 상태를 hidden input을 통해 서버로 전달(action함수에서 사용하기 위함)
 * 4. 로그인 실패 시 errorMessage를 이메일/비밀번호 입력란 하단에 표시
 */

const SignInForm = ({ errorMessage, savedEmail }) => {
  const { email, setEmail, password, setPassword } = useSignInForm();
  const [emailSave, setEmailSave] = useState(false);
  const [autoSignin, setAutoSignin] = useState(false);

  // 아이디 저장
  useEffect(() => {
    if (!savedEmail) return;
    setEmail(savedEmail);
    setEmailSave(true);
  }, []);

  // 아이디 저장 핸들러
  const emailSaveHandler = () => {
    setEmailSave(!emailSave);
  };

  const autoSigninHandler = () => {
    setAutoSignin(!autoSignin);
  };

  // 로그인 제출 전 로직
  const submitHandler = () => {
    if (emailSave) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }
  };

  return (
    <Form
      className="sign-in-form-container"
      method="post"
      onSubmit={submitHandler}
    >
      <div className="sign-in-form">
        <input
          className="email-form"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="password-form"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <div className="sign-in-error-message">{errorMessage}</div>
        )}
      </div>

      <div className="sign-in-option-container">
        <div className="email-save-container">
          <button
            type="button"
            onClick={emailSaveHandler}
            className={`email-save-btn ${emailSave ? "active" : ""}`}
          />
          <span>아이디 저장</span>
        </div>
        <div className="auto-sign-in-container">
          <button
            type="button"
            onClick={autoSigninHandler}
            className={`auto-sign-in-btn ${autoSignin ? "active" : ""}`}
          />
          <span>자동로그인</span>
        </div>
      </div>

      <button
        type="submit"
        className="sign-in-btn"
        name="sign-in-type"
        value="user"
      >
        로그인
      </button>
      <button
        type="submit"
        className="guest-sign-in-btn"
        name="sign-in-type"
        value="guest"
      >
        게스트 로그인
      </button>

      <input type="hidden" name="autoSignin" value={autoSignin} />
    </Form>
  );
};

export default SignInForm;
