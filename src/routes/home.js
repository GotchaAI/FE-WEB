import HomePage, { loader as homeLoader } from "pages/home/HomePage";
import IntroducePage from "pages/introduce/IntroducePage";
import Home from "components/home/Home";
import AnnouncePage from "pages/home/AnnouncePage";
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
      {
        path: "announce",
        element: <AnnouncePage />,
      }
    ],
  },
];

export default home;
