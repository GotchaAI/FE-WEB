import HomePage, { loader as homeLoader } from "pages/home/HomePage";
import IntroducePage, {
  loader as introduceLoader,
} from "pages/introduce/IntroducePage";
const home = [
  {
    path: "/",
    element: <HomePage />,
    loader: homeLoader,
  },
  {
    path: "/character-intro",
    element: <IntroducePage />,
    loader: introduceLoader,
  },
];

export default home;
