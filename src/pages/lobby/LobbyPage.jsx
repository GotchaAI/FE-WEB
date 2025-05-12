import springImg from "assets/commons/spring.png";
import LobbyHeader from "components/lobby/LobbyHeader";
import Friend from "components/lobby/friend/Friend";
import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import { ROOT_URL } from "constants/url";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { tokenReissueAPI } from "services/auth/auth";
import "styles/pages/lobby/LobbyPage.scss";
import { getAuthToken } from "utils/token";

const LobbyPage = () => {
  // 소켓 연결 테스트(지워도 됨!)
  // const nickName = "jiwon";
  // const roomId = "1234";
  //useGameSocket({ nickName, roomId });
  const [tabType, setTabType] = useState("type-a");

  return (
    <div className="lobby-page-container">
      <LobbyHeader />
      <div className="body-container">
        <Friend />
        <div className="main-content-container">
          <img src={springImg} alt="스프링" />
          <div className="main-content-tabs-container">
            <button
              className={`a-btn ${tabType === "type-a" ? "active" : ""}`}
              onClick={() => setTabType("type-a")}
            >
              A
            </button>
            <button
              className={`b-btn ${tabType === "type-b" ? "active" : ""}`}
              onClick={() => setTabType("type-b")}
            >
              B
            </button>
          </div>
          <div className="main-content-layout">
            {/* 상태나 라우팅에 따라 WaitingRoom or Mypage로 */}
            <WaitingRoom />
          </div>
        </div>

        <div className="chat-container"></div>
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
