import springImg from "assets/commons/spring.png";
import LobbyChatting from "components/lobby/LobbyChatting";
import LobbyHeader from "components/lobby/LobbyHeader";
import Friend from "components/lobby/friend/Friend";
import { GAME1_ROBBY_URL, GAME2_ROBBY_URL, ROOT_URL } from "constants/url";
import useLobbySocket from "hooks/lobby/useLobbySocket";
import useGameSocket from "hooks/useGameSocket";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/lobby/LobbyPage.scss";
import { getAuthToken } from "utils/token";
import { getUserUuid } from "utils/user";

const LobbyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navType = location.pathname.includes("/game2") ? "game2" : "game1";

  const [selectedRoomId, setSelectedRoomId] = useState("7126"); // 입장할 roomId
  console.log(setSelectedRoomId); // ESLint 방지

  const userUuid = getUserUuid();
  useGameSocket({ userUuid }); // 소켓 연결

  const { createRoom, enterRoom, enterRoomId } = useLobbySocket({
    userUuid,
  });

  // 임시 : 방 생성 함수
  const makeRoomHandler = () => {
    // 방 만들기
    createRoom();
  };

  // 임시 : 방 입장 함수
  const enterRoomHandler = () => {
    // 방 입장
    enterRoom(selectedRoomId);
  };

  // 생성 및 입장 시 발동
  useEffect(() => {
    if (enterRoomId) {
      console.log("🎉 입장 성공!", enterRoomId);

      navigate(`./test?roomId=${enterRoomId}`);
    }
  }, [enterRoomId, navigate]);

  return (
    <div className="lobby-page-container">
      <LobbyHeader />
      <div className="body-container">
        <Friend />
        <div className="main-content-container">
          <img src={springImg} alt="스프링" className="main-content-img" />
          <div className="main-content-nav-container">
            <Link
              to={GAME2_ROBBY_URL}
              className={`a-btn ${navType === "game2" ? "active" : ""}`}
            >
              루루의 미대입시
            </Link>
            <Link
              to={GAME1_ROBBY_URL}
              className={`b-btn ${navType === "game1" ? "active" : ""}`}
            >
              묘묘를 속여라!
            </Link>
          </div>
          <div className="main-content-layout">
            {/* 상태나 라우팅에 따라 WaitingRoom or Mypage로 */}
            <Outlet />
            <button onClick={makeRoomHandler}>방 만들기</button>
            <button onClick={enterRoomHandler}>방 입장하기</button>
          </div>
        </div>

        <div className="lobby-chat-container">
          <LobbyChatting />
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;

export const loader = async () => {
  const { accessToken, setAccessToken } = getAuthToken();

  if (!accessToken) {
    // 토큰 재발급
    try {
      const res = await tokenReissueAPI();
      const newAccessToken = res.accessToken;
      const newExpireTime = res.expiredAt;

      setAccessToken(newAccessToken, newExpireTime);
    } catch (e) {
      return redirect(ROOT_URL);
    }
  }

  return;
};
