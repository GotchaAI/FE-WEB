import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import LazyGame1Page from "pages/game/game1/LazyGame1Page";
import Game1CreatePage from "pages/game/Game1CreatePage";
import Game1LobbyPage from "pages/game/Game1LobbyPage";
import LazyGame2Page from "pages/game/game2/LazyGame2Page";
import Game2LobbyPage from "pages/game/Game2LobbyPage";
import LobbyLayout, {
  loader as lobbyLayoutLoader,
} from "pages/lobby/LobbyLayout";
import LobbyPage from "pages/lobby/LobbyPage";
import SettingPage from "pages/lobby/SettingPage";

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
            ],
          },
          {
            path: "waiting",
            element: <WaitingRoom />,
          },
          {
            path: "setting",
            element: <SettingPage />,
          },
        ],
      },
      {
        path: "play",
        element: <LazyGame1Page />,
      },
      {
        path: "play2",
        element: <LazyGame2Page />,
      },
    ],
  },
];

export default lobby;
