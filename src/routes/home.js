import HomePage, { loader as homeLoader } from "pages/home/HomePage";
import IntroducePage from "pages/introduce/IntroducePage";
import Home from "components/home/Home";
import AnnouncePage from "pages/home/AnnouncePage";
import AnnounceDetailPage from "pages/home/AnnounceDetailPage";
import ServiceCenter from "pages/home/ServiceCenterPage";
import ServiceHelpPage from "pages/home/ServiceHelpPage";
import ServiceFAQPage from "pages/home/ServiceFAQPage";
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
      },
      {
        path: "announce/:id",
        element: <AnnounceDetailPage />
      },
      {
        path: "service-center",
        element: <ServiceCenter />,
      },
      {
        path: "service-center/help",
        element: <ServiceHelpPage />
      },
      {
        path: "service-center/FAQ",
        element: <ServiceFAQPage />
      }
    ],
  },
];

export default home;
