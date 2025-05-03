import HomeLayout, { loader as homeLoader } from "pages/home/HomeLayout";
import HomePage from "pages/home/HomePage";

const home = [
  {
    path: "/",

    element: <HomeLayout />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default home;
