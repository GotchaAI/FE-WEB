import IntroducePage, {
  loader as introduceLoader,
} from "pages/introduce/IntroducePage";

const introduce = [
  {
    path: "/character-intro",
    element: <IntroducePage />,
    loader: introduceLoader,
  },
];

export default introduce;
