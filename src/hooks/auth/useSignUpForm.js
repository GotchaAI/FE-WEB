import { EMAIL_CODE_MISMATCH_ERROR_MESSAGE, EMAIL_VALIDATION_ERROR_MESSAGE, NICKNAME_VAILDATION_ERROR_MESSAGE, PASSWORD_CONFIRM_ERROR_MESSAGE, PASSWORD_VALIDATION_ERROR_MESSAGE } from "constants/errorMessage";
import { useState } from "react";
import { isVaildNickname, isValidEmail, isValidPassword } from "utils/validation";

const useSignUpForm = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateError, setvalidateError] = useState("");

  // ✅ 닉네임 입력 시 실시간 형식 검사
  const handleNicknameChange = (value) => {
    setNickname(value);
    if (!isVaildNickname(value)) {
      setvalidateError(NICKNAME_VAILDATION_ERROR_MESSAGE);
    } else {
      setvalidateError("");
    }
  };

  const validate = () => {
    let valid = true;
    let newError;

    if (!isVaildNickname(nickname)) {
      newError = NICKNAME_VAILDATION_ERROR_MESSAGE;
      valid = false;
    }

    if (!isValidPassword(password)) {
      newError = PASSWORD_VALIDATION_ERROR_MESSAGE;
      valid = false;
    }
    if (password !== confirmPassword) {
      newError = PASSWORD_CONFIRM_ERROR_MESSAGE;
      valid = false;
    }

    if (!isValidEmail(email)) {
      newError = EMAIL_VALIDATION_ERROR_MESSAGE;
      valid = false;
    }
    if (emailCode !== "0000") {
      newError = EMAIL_CODE_MISMATCH_ERROR_MESSAGE;
      valid = false;
    }

    setvalidateError(newError);
    return valid;
  };

  return {
    nickname,
    setNickname,
    email,
    setEmail,
    emailCode,
    setEmailCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validateError,
    setvalidateError,
    validate,
    handleNicknameChange,
  };
};

export default useSignUpForm;
