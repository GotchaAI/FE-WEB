import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/commons/GameStartScene.scss";

/**
 * GameStartScene : 게임 시작
 *
 * 3초간 카운트 다운 진행 후 드로잉 시작
 *
 */
const GameStartScene = ({ goToNextFlow }) => {
  useEffect(() => {
    useToastStore
      .getState()
      .showToast("countdown", "AI를 속여 제시어를 그려주세요!", 3000);
    goToNextFlow(); // 다음 scene으로 이동
  }, [goToNextFlow]);

  return null;
};

export default GameStartScene;
