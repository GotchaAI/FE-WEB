import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import logoImg from "assets/commons/logo.png";
import "styles/pages/game/game2/Game2Page.scss";

import useGame2 from "hooks/game/game2/useGame2";

import Game2Opening from "components/scenes/game2/Game2Opening";
import DrawingDescription from "components/scenes/game2/DrawingDescription";
import Game2DrawScene from "components/scenes/game2/Game2DrawScene";
import Game2ResultScene from "components/scenes/game2/Game2ResultScene";

/**
 * Game2Page 컴포넌트
 *
 * 이 컴포넌트는 Game 2의 전체 진행 흐름을 관리하는 루트 페이지입니다.
 * - URL 쿼리스트링으로부터 gameId를 받아 게임 데이터를 초기화합니다.
 * - 게임은 Opening → 제시어 설명 → 그림 그리기 → 결과 화면 순서로 구성되어 있으며,
 *   sceneIdx 상태를 기반으로 각 씬을 렌더링합니다.
 * - 각 씬은 배열로 구성된 `scenes`를 통해 동적으로 관리됩니다.
 * - 게임 흐름 전환은 `goToNextScene()` 호출로 이루어집니다.
 *
 * 주요 기능:
 * - gameId를 기반으로 제시어 요청(fetchPrompt)
 * - 그림 제출 처리 및 평가 요청(handleSubmitDrawing)
 * - 각 씬의 상태 초기화(resetGame) 및 페이지 이동 처리
 */

const Game2Page = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
  const navigate = useNavigate();

  const {
    sceneIdx,
    gameData,
    goToNextScene,
    fetchPrompt,
    handleSubmitDrawing,
  } = useGame2({ gameId });

  useEffect(() => {
    fetchPrompt(); // 게임 시작 시 제시어 요청
  }, [fetchPrompt]);

  const scenes = useMemo(
    () => [
      <Game2Opening onNext={goToNextScene} />,
      <DrawingDescription
        description={gameData.description}
        onOk={goToNextScene}
      />,
      <Game2DrawScene
        gameData={gameData}
        onSubmit={async (imageUrl) => {
          await handleSubmitDrawing(imageUrl);
        }}
        onNext={goToNextScene} // Game2ResultScene으로 이동
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
