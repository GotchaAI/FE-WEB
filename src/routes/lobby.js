import { loader as lobbyLayoutLoader } from "pages/lobby/LobbyLayout";
import { lazy } from "react";

const LobbyLayout = lazy(() => import("pages/lobby/LobbyLayout"));
const LobbyPage = lazy(() => import("pages/lobby/LobbyPage"));
const Game1LobbyPage = lazy(() => import("pages/game/Game1LobbyPage"));
const Game1CreatePage = lazy(() => import("pages/game/Game1CreatePage"));
const Game2LobbyPage = lazy(() => import("pages/game/Game2LobbyPage"));
const WaitingRoom = lazy(() => import("components/lobby/waiting/WaitingRoom"));
const Game1Page = lazy(() => import("pages/game/game1/Game1Page"));
const Game2Page = lazy(() => import("pages/game/game2/Game2Page"));

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
