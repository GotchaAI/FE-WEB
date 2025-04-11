import { useState } from "react";

const useSignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return { email, setEmail, password, setPassword };
};

export default useSignInForm;
