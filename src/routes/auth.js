import SignInPage, {
  action as signInAction,
  loader as signInLoader,
} from "pages/auth/SignInPage";
import SignUpPage, {
  action as signUpAction,
  loader as signUpLoader,
} from "pages/auth/SignUpPage";

const auth = [
  {
    path: "signin",
    element: <SignInPage />,
    loader: signInLoader,
    action: signInAction,
  },
  {
    path: "signup",
    element: <SignUpPage />,
    loader: signUpLoader,
    action: signUpAction,
  },
];

export default auth;
