import { EditAvatar } from "components/lobby/mypage/EditAvatar";
import { EditNickname } from "components/lobby/mypage/EditNickname";
import { MyPageHome } from "components/lobby/mypage/MyPageHome";
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
import MyInfoPage from "pages/lobby/mypage/MyInfoPage";
import MyRecordPage from "pages/lobby/mypage/MyRecordPage";

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
            path: "myinfo",
            element: <MyInfoPage />,
            children: [
              {
                index: true,
                element: <MyPageHome />,
              },
              {
                path: "record",
                element: <MyRecordPage />,
              },
              {
                path: "edit-avatar",
                element: <EditAvatar />,
              },
              {
                path: "edit-nickname",
                element: <EditNickname />,
              },
            ],
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
