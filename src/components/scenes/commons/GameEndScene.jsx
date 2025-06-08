import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/commons/GameEndScene.scss";

/**
 * GameEndScene : 게임 종료
 *
 * timeover 토스트메세지 출력
 */
const GameEndScene = () => {
  useEffect(() => {
    useToastStore.getState().showToast("timeover");
  }, []);

  return null;
};

export default GameEndScene;
