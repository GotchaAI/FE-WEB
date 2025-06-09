import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logoImg from "assets/commons/logo.png";
import "styles/pages/game/game2/Game2Page.scss";

import useGame2 from "hooks/game/game2/useGame2";

import Game2Opening from "components/scenes/game2/Game2Opening";
import DrawingDescription from "components/scenes/game2/DrawingDescription";
import DrawScene from "components/scenes/game2/DrawScene";
import DrawingWaiting from "components/scenes/game2/DrawingWaiting";
import Game2ResultScene from "components/scenes/game2/Game2ResultScene";

const Game2Page = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 먼저 훅 호출
  const { sceneIdx, gameData, setGameData, goToNextScene, resetGame } =
    useGame2([]);

  // 씬 구성
  const scenes = useMemo(
    () => [
      <Game2Opening onNext={() => goToNextScene()} />,
      <DrawingDescription
        gameData={gameData}
        onOk={() => goToNextScene()}
        onCancel={() => {}}
      />,
      <DrawScene gameData={gameData} onSubmit={() => goToNextScene()} />,
      <DrawingWaiting onDone={() => goToNextScene()} />,
      <Game2ResultScene onExit={() => navigate("/lobby")} />,
    ],
    [gameData, goToNextScene, navigate]
  );

  // GameData 초기 세팅 (로비에서 받은 location.state 사용)
  useEffect(() => {
    if (location.state) {
      console.log("Game2Page: gameData 수신", location.state);
      setGameData(location.state);
    } else {
      // 만약 location.state 없이 들어오면 → 잘못된 진입 → lobby로 돌려보내기
      console.warn("Game2Page: gameData 없음 → lobby로 이동");
      navigate("/lobby");
    }
  }, [location.state, setGameData, navigate]);

  // 씬 초기화
  useEffect(() => {
    resetGame();
  }, [scenes, resetGame]);

  return (
    <div className="game2-page-container">
      <img src={logoImg} className="logo-img" alt="로고" />

      <div className="game2-scene">{scenes[1] || null}</div>
    </div>
  );
};

export default Game2Page;
