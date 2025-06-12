import springImg from "assets/commons/spring.png";
import LobbyChatting from "components/lobby/LobbyChatting";
import LobbyHeader from "components/lobby/LobbyHeader";
import Friend from "components/lobby/friend/Friend";
import {
  GAME1_ROBBY_URL,
  GAME2_ROBBY_URL,
  WAITING_ROOM_URL,
} from "constants/url";
import useBGM3 from "hooks/lobby/useBGM3";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { reconnectAPI } from "services/lobby/lobby";
import "styles/pages/lobby/LobbyPage.scss";
import { getUserUuid } from "utils/user";

const LobbyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = location.pathname.includes("/game2") ? "game2" : "game1";
  const userUuid = getUserUuid();
  const [whisperNickname, setWhisperNickname] = useState("");

  useBGM3("LobbyBGM", 0.5);

  const reconnect = async () => {
    try {
      const res = await reconnectAPI();

      navigate(`${WAITING_ROOM_URL}?roomId=${res.roomId}`);
    } catch (e) {
      console.log("입장중이던 방이 없습니다.");
    }
  };

  useEffect(() => {
    reconnect();
  }, []);

  return (
    <div className="lobby-page-container">
      <LobbyHeader />
      <div className="body-container">
        <Friend userUuid={userUuid} setWhisperNickname={setWhisperNickname} />
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
          </div>
        </div>

        <div className="lobby-chat-container">
          <LobbyChatting
            whisperNickname={whisperNickname}
            setWhisperNickname={setWhisperNickname}
          />
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
