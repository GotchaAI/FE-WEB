import logoImage from "assets/commons/logo.png";
import springImg from "assets/commons/spring.png";
import Mypage from "commons/options/Mypage";
import Settings from "commons/options/Settings";
import Sound from "commons/options/Sound";
import Friend from "components/lobby/friend/Friend";
import WaitingRoom from "components/lobby/waiting/WaitingRoom";
import Profile from "pages/home/Profile";
import { useState } from "react";
import "styles/components/lobby/Lobby.scss";

const Lobby = () => {
  const [navType, setNavType] = useState("type-a");

  return (
    <div className="lobby-container">
      <header className="header-container">
        <Profile />
        <img className="logo-img" src={logoImage} alt="로고" />
        <div className="options-container">
          <Settings />
          <Sound />
          <Mypage />
        </div>
      </header>
      <div className="body-container">
        <Friend />
        <div className="main-content-container">
          <img src={springImg} alt="스프링" />
          <div className="main-content-nav-container">
            <button
              className={`a-btn ${navType === "type-a" ? "active" : ""}`}
              onClick={() => setNavType("type-a")}
            >
              A
            </button>
            <button
              className={`b-btn ${navType === "type-b" ? "active" : ""}`}
              onClick={() => setNavType("type-b")}
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

export default Lobby;
