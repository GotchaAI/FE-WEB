import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "assets/commons/logo.png";
import "styles/pages/game/game2/Game2Page.scss";

import useGame2 from "hooks/game/game2/useGame2";

import Game2Opening from "components/scenes/game2/Game2Opening";
import DrawingDescription from "components/scenes/game2/DrawingDescription";
import Game2DrawScene from "components/scenes/game2/Game2DrawScene";
import Game2ResultScene from "components/scenes/game2/Game2ResultScene";

const Game2Page = () => {
  const navigate = useNavigate();

  const {
    sceneIdx,
    gameData,
    goToNextScene,
    resetGame,
    fetchPrompt,
    handleSubmitDrawing,
  } = useGame2();

  useEffect(() => {
    fetchPrompt(); // 게임 시작 시 제시어 요청
  }, [fetchPrompt]);

  useEffect(() => {
    resetGame(); // 씬 인덱스 초기화
  }, [resetGame]);

  const scenes = useMemo(
    () => [
      <Game2Opening fetchPrompt={fetchPrompt} onNext={goToNextScene} />,
      <DrawingDescription gameData={gameData} onOk={goToNextScene} />,
      <Game2DrawScene
        gameData={gameData}
        onSubmit={async (imageUrl) => {
          await handleSubmitDrawing(imageUrl);
        }}
        onNext={goToNextScene} // Game2ResultScene으로
      />,
      <Game2ResultScene
        gameData={gameData}
        onExit={() => navigate("/lobby/game2")}
      />,
    ],
    [gameData, goToNextScene, handleSubmitDrawing, navigate, fetchPrompt]
  );

  return (
    <div className="game2-page-container">
      <img src={logoImg} className="logo-img" alt="로고" />
      <div className="game2-scene">{scenes[sceneIdx] || null}</div>
    </div>
  );
};

export default Game2Page;
