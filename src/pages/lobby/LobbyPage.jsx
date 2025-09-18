import springImg from "assets/commons/spring.png";
import LobbyChatting from "components/lobby/LobbyChatting";
import LobbyHeader from "components/lobby/LobbyHeader";
import LobbyNavBar from "components/lobby/LobbyNavBar";
import Friend from "components/lobby/friend/Friend";
import { LobbyBGM } from "constants/audio";
import { WAITING_ROOM_URL } from "constants/url";
import useAudio from "hooks/audio/useAudio";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { reconnectAPI } from "services/lobby/lobby";
import "styles/pages/lobby/LobbyPage.scss";
import { getUserUuid } from "utils/user";

const LobbyPage = () => {
  const navigate = useNavigate();

  const userUuid = getUserUuid();
  const [whisperNickname, setWhisperNickname] = useState("");

  // 오디오 초기화
  useAudio(LobbyBGM);

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

  useEffect(() => {
    //나중에 설정, 같은것도 추가하면됨
    if (location.pathname.includes("myinfo")) {
      setContentMode("myinfo");
    } else {
      // 로비의 경우 (디폴트로 생각하면 됨)
      setContentMode("game");
    }
  }, [location.pathname]);

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
