import Timer from "commons/Timer";
import GameEndScene from "components/scenes/commons/GameEndScene";
import GameStartScene from "components/scenes/commons/GameStartScene";
import DrawTools from "components/scenes/game1/DrawTools";
import useBGM from "hooks/game/game1/useBGM";
import useCanvas from "hooks/game/game1/useCanvas";
import useDrawSocket from "hooks/game/game1/useDrawSocket";
import { useCallback } from "react";
import "styles/components/scenes/game1/DrawScene.scss";

/**
 * DrawScene : 그림 그리기 scene
 *
 * 제시어를 제공받고 제공되는 시간동안 그림을 그리는 scene
 *
 * 핵심 상태 flow 를 활용해서 모달창 및 게임이 진행된다.
 *
 * flow
 * 1 : 초기값, 카운트 다운 진행
 * 2 : 드로잉 시간, endTime까지 진행
 * 3 : 드로잉 종료, 그림 강제 제출
 *
 * TODO: 사용자 인터렉트 UI 향상, 중복 제출 방지
 */

const DrawScene = ({ topic, roomId, endTime }) => {
  // 🪝 드로잉 커스텀 훅
  const {
    canvasRef,
    startDrawing,
    drawing,
    stopDrawing,
    togglePen,
    toggleEraser,
    handleClearCanvas,
    getImageUrl,
    isDrawingDisabled,
    setIsDrawingDisabled,
  } = useCanvas();

  // 🪝 DrawScene 소켓 커스텀 훅
  const { flow, setFlow, submitHandler } = useDrawSocket({
    roomId,
    isDrawingDisabled,
    setIsDrawingDisabled,
    getImageUrl,
  });

  // 🪝 배경음악
  useBGM("DrawScene");

  // 다음 flow
  const goToNextFlow = useCallback(() => {
    setFlow((prev) => prev + 1);
  }, [setFlow]);

  return (
    <div className="draw-scene-container">
      {/* 토스트 메세지 그룹 */}
      <>
        {flow === 1 && <GameStartScene goToNextFlow={goToNextFlow} />}
        {flow === 3 && <GameEndScene goToNextFlow={goToNextFlow} />}
      </>

      {/* 버튼 그룹 */}
      <DrawTools
        onTogglePen={togglePen}
        onToggleEraser={toggleEraser}
        onClearCanvas={handleClearCanvas}
        onSubmit={submitHandler}
        disabled={isDrawingDisabled}
      />

      {/* 캔버스 */}
      <div className="drawing-container">
        <div className="game-header">
          {/* 타이머 ⏰*/}
          <Timer endTime={endTime} flow={flow} goToNextFlow={goToNextFlow} />
          <div className="word-container">
            <span className="word">{topic}</span>
          </div>
        </div>

        <canvas
          className="drawing-zone"
          ref={canvasRef}
          onMouseDown={isDrawingDisabled ? null : startDrawing}
          onMouseUp={isDrawingDisabled ? null : stopDrawing}
          onMouseMove={isDrawingDisabled ? null : drawing}
        />
      </div>
    </div>
  );
};

export default DrawScene;
