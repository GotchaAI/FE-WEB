import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import Game1CreatePage from "pages/game/Game1CreatePage";
import Game1LobbyPage from "pages/game/Game1LobbyPage";
import Game2LobbyPage from "pages/game/Game2LobbyPage";
import Game1Page from "pages/game/game1/Game1Page";
import Game2Page from "pages/game/game2/Game2Page";
import LobbyLayout, {
  loader as lobbyLayoutLoader,
} from "pages/lobby/LobbyLayout";
import LobbyPage from "pages/lobby/LobbyPage";

const lobby = [
  {
    path: "lobby",
    element: <LobbyLayout />,
    loader: lobbyLayoutLoader,
    children: [
      {
        path: "",
        element: <LobbyPage />,
        children: [
          {
            index: true,
            element: <Game1LobbyPage />,
          },
          {
            path: "game1",
            children: [
              {
                index: true,
                element: <Game1LobbyPage />,
              },
              {
                path: "create",
                element: <Game1CreatePage />,
              },
            ],
          },
          {
            path: "game2",
            children: [
              {
                index: true,
                element: <Game2LobbyPage />,
              },
              // {
              //   path: "create",
              //   element: <Game1CreatePage />,
              // },
            ],
          },
          {
            path: "waiting",
            element: <WaitingRoom />,
          },
          {
            path: "mypage",
            element: <>하이 반갑다</>,
          },
        ],
      },
      {
        path: "play",
        element: <Game1Page />,
      },
      {
        path: "play2",
        element: <Game2Page />,
      },
    ],
  },
];

export default lobby;
