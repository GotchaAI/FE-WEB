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
                element: <>업적 한눈에 보기</>,
              },
              {
                path: "record",
                element: <MyRecordPage />,
              },
              {
                path: "edit-avatar",
                element: <>아바타 변경</>,
              },
              {
                path: "edit-nickname",
                element: <>닉네임 변경</>,
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
