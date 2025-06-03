import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import Game2LobbyPage from "pages/game/Game2LobbyPage";
import Game1CreatePage from "pages/game/Gam1CreatePage";
import Game1LobbyPage from "pages/game/Game1LobbyPage";
import LobbyPage, { loader as lobbyLoader } from "pages/lobby/LobbyPage";

const lobby = [
  {
    path: "lobby",
    element: <LobbyPage />,
    loader: lobbyLoader,
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
      }
    ],
  },
];

export default lobby;
