import { EMAIL_CODE_MISMATCH_ERROR_MESSAGE, EMAIL_VALIDATION_ERROR_MESSAGE, NICKNAME_VAILDATION_ERROR_MESSAGE, PASSWORD_CONFIRM_ERROR_MESSAGE, PASSWORD_VALIDATION_ERROR_MESSAGE } from "constants/errorMessage";
import { useState } from "react";
import { isVaildNickname, isValidEmail, isValidPassword } from "utils/validation";

const useSignUpForm = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  // 닉네임 입력 시 실시간 형식 검사
  const handleNicknameChange = (value) => {
    setNickname(value);
    setNicknameError(value && !isVaildNickname(value) ? NICKNAME_VAILDATION_ERROR_MESSAGE : "");
  };


  // 비밀번호 입력 시 실시간 형식 검사
  const handlePasswordChange = (value) => {
    setPassword(value);
    validatePasswordAll(value, confirmPassword);
  };

  // 비밀번호 재입력 시 실시간 형식 검사
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    validatePasswordAll(password, value);
  };

  // 공통 비밀번호 검증 함수
  const validatePasswordAll = (pwd, confirmPwd) => {
    if (!pwd && !confirmPwd) {
      setPasswordError("");
      return;
    }

    if (!isValidPassword(pwd)) {
      setPasswordError(PASSWORD_VALIDATION_ERROR_MESSAGE);
    } else if (confirmPwd && pwd !== confirmPwd) {
      setPasswordError(PASSWORD_CONFIRM_ERROR_MESSAGE);
    } else {
      setPasswordError("");
    }
  };


  // 이메일 입력 시 실시간 형식 검사
  const handleEmailChange = (value) => {
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError(EMAIL_VALIDATION_ERROR_MESSAGE);
    } else {
      setEmailError("");
    }
  }

  // 이메일 코드 입력 시 실시간 형식 검사
  const handleEmailCodeChange = (value) => {
    setEmailCode(value);
    if (emailCode !== "0000") {
      setEmailError(EMAIL_CODE_MISMATCH_ERROR_MESSAGE);
    } else {
      setEmailError("");
    }
  }

  return {
    nickname,
    email,
    emailCode,
    password,
    confirmPassword,
    handleNicknameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleEmailCodeChange,
    nicknameError,
    passwordError,
    emailError,
    setNicknameError,
  };
};

export default useSignUpForm;
