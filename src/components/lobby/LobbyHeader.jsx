import logoImage from "assets/commons/logo.png";
import Mypage from "commons/options/Mypage";
import Settings from "commons/options/Settings";
import Sound from "commons/options/Sound";
import Profile from "components/home/Profile";
import "styles/components/lobby/LobbyLayout.scss";

const LobbyHeader = () => {
  return (
    <header className="header-container">
      <Profile />
      <img className="logo-img" src={logoImage} alt="로고" />
      <div className="options-container">
        <Settings />
        <Sound />
        <Mypage />
      </div>
    </header>
  );
};

export default LobbyHeader;
