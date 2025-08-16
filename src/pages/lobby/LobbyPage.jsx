import springImg from "assets/commons/spring.png";
import LobbyChatting from "components/lobby/LobbyChatting";
import LobbyHeader from "components/lobby/LobbyHeader";
import LobbyNavBar from "components/lobby/LobbyNavBar";
import Friend from "components/lobby/friend/Friend";
import { WAITING_ROOM_URL } from "constants/url";
import useBGM3 from "hooks/lobby/useBGM3";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { reconnectAPI } from "services/lobby/lobby";
import "styles/pages/lobby/LobbyPage.scss";
import { getUserUuid } from "utils/user";

const LobbyPage = () => {
  const navigate = useNavigate();

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
            <LobbyNavBar />
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
