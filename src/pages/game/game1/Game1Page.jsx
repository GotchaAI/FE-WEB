import { useEffect } from "react";

import Game1Opening from "components/scenes/game1/Game1Opening";
import useGame1Socket from "hooks/game/game1/useGame1Socket";
import Game1Header from "pages/game/game1/Game1Header";
import { useLocation } from "react-router-dom";
import "styles/pages/game/game1/Game1Page.scss";

/**
 * Game1Page : 게임 최상위 페이지
 *
 */

const Game1Page = () => {
  // 🪝게임 소켓 연동
  const {
    sceneIdx,
    isGameStart,
    gameInfo,
    answerResults,
    setGameInfo,
    renderScenes,
  } = useGame1Socket();

  // ✨ 게임정보 초기화
  const location = useLocation(); // 게임 정보 받아오기 (location.state)
  useEffect(() => {
    if (location.state) {
      setGameInfo(location.state);
    }
  }, [location.state, setGameInfo]);

  const scenes = renderScenes();
  const currentScene = scenes[sceneIdx] || null;

  // 오프닝 출력
  // TODO: 좀 덜 짜치게 변경
  if (!isGameStart) {
    return <Game1Opening />;
  }

  // 게임 컴포넌트
  return (
    <div className="game-page-container">
      {/** 오른쪽 상단 ROUND 정보 */}
      <Game1Header
        totalRounds={gameInfo?.totalRounds || 0}
        currentSceneIdx={sceneIdx}
        answerResults={answerResults}
      />

      {/** sceneIdx에 해당하는 게임 씬 랜더링 */}
      <div className="game-scene">{currentScene}</div>
    </div>
  );
};

export default Game1Page;
