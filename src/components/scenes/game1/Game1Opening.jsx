import logoImg from "assets/commons/logo.png";
import aiImg from "assets/components/scenes/game1/ai.png";
import userImg from "assets/components/scenes/game1/player.png";
import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game1/Game1Opening.scss";
// TODO: 계속 토스트 메세지 띄워주다가 ROUND_START 되면 꺼지게
const Game1Opening = () => {
  useEffect(() => {
    useToastStore
      .getState()
      .showToast("gamealert", "AI를 속여 제시어를 그려주세요!", 5000);
  }, []);

  return (
    <div className="game1-opening-container">
      <div className="user-container">
        <div className="user">
          <img src={userImg} alt="플레이어" />
        </div>
      </div>
      <img src={logoImg} className="logo-img" alt="로고" />
      <div className="ai-container">
        <img src={aiImg} alt="인공지능" />
        <div className="ai" />
      </div>
    </div>
  );
};

export default Game1Opening;
