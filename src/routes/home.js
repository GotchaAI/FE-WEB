import HomePage, { loader as homeLoader } from "pages/home/HomePage";

const home = [
  {
    path: "/",
    element: <HomePage />,
    loader: homeLoader,
  },
];

export default home;
