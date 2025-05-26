import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import Game1LobbyPage from "pages/game/Game1LobbyPage";
import Game2CreatePage from "pages/game/Game2CreatePage";
import Game2LobbyPage from "pages/game/Game2LobbyPage";
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
        element: <Game1LobbyPage />,
      },
      {
        path: "game2",
        children: [
          {
            index: true,
            element: <Game2LobbyPage />,
          },
          {
            path: "create",
            element: <Game2CreatePage />,
          },
        ],
      },
      {
        path: "test",
        element: <WaitingRoom />,
      }
    ],
  },
];

export default lobby;
