import {
  EMAIL_VALIDATION_ERROR_MESSAGE,
  PASSWORD_VALIDATION_ERROR_MESSAGE,
} from "constants/errorMessage";
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
      newError = PASSWORD_VALIDATION_ERROR_MESSAGE;
      valid = false;
    }

    if (!isValidEmail(email)) {
      newError = EMAIL_VALIDATION_ERROR_MESSAGE;
      valid = false;
    }

    setvalidateError(newError);
    return valid;
  };
  return { email, setEmail, password, setPassword, validateError, validate };
};

export default useSignInForm;
