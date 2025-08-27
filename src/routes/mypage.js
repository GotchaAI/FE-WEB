// routes/mypage.js
import { EditAvatar } from "components/lobby/mypage/EditAvatar";
import { EditNickname } from "components/lobby/mypage/EditNickname";
import { MyPageHome } from "components/lobby/mypage/MyPageHome";
import MyInfoPage from "pages/lobby/mypage/MyInfoPage";
import MyRecordPage from "pages/lobby/mypage/MyRecordPage";

const mypage = [
  {
    path: "myinfo",
    element: <MyInfoPage />,
    children: [
      { index: true, element: <MyPageHome /> },
      { path: "record", element: <MyRecordPage /> },
      { path: "edit-avatar", element: <EditAvatar /> },
      { path: "edit-nickname", element: <EditNickname /> },
    ],
  },
];

export default mypage;
