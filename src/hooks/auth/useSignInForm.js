import { useState } from "react";
import { isValidEmail, isValidPassword } from "utils/validation";

const useSignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateError, setvalidateError] = useState("");

  const validate = () => {
    let valid = true;
    let newError;

    if (!isValidPassword(password)) {
      newError = "비밀번호는 특수문자 포함 8자리 이상이어야 합니다.";
      valid = false;
    }

    if (!isValidEmail(email)) {
      newError = "유효한 이메일 형식이 아닙니다.";
      valid = false;
    }

    setvalidateError(newError);
    return valid;
  };
  return { email, setEmail, password, setPassword, validateError, validate };
};

export default useSignInForm;
