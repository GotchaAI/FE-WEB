import HomePage, { loader as homeLoader } from "pages/home/HomePage";
import IntroducePage from "pages/introduce/IntroducePage";
import Home from "components/home/Home";
const home = [
  {
    path: "/",
    element: <HomePage />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "character-intro",
        element: <IntroducePage />,
      },
    ],
  },
];

export default home;
