import SignInPage, {
  action as signInAction,
  loader as signInLoader,
} from "pages/auth/SignInPage";
import SignUpPage from "pages/auth/SignUpPage";

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
  },
];

export default auth;
