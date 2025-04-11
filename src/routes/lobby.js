import LobbyLayout, { loader as lobbyLoader } from "pages/lobby/LobbyLayout";
import LobbyPage from "pages/lobby/LobbyPage";

const lobby = [
  {
    path: "lobby",
    element: <LobbyLayout />,
    children: [
      {
        index: true,
        element: <LobbyPage />,
        loader: lobbyLoader,
      },
    ],
  },
];

export default lobby;
