import { useCallback, useEffect, useState } from "react";
import Timer from "commons/Timer";
import DrawTools from "components/scenes/game1/DrawTools";
import useCanvas from "hooks/game/game1/useCanvas";
import GameEndScene from "components/scenes/commons/GameEndScene";
import DrawingWaiting from "components/scenes/game2/DrawingWaiting";
import PaletteTools from "./PaletteTools";
import "styles/components/scenes/game2/Game2DrawScene.scss";
import useGame2Draw from "hooks/game/game2/useGame2Draw";

const Game2DrawScene = ({ gameData, onSubmit, onNext }) => {
  const {
    canvasRef,
    startDrawing,
    drawing,
    stopDrawing,
    togglePen,
    toggleEraser,
    handleClearCanvas,
    getImageUrl,
    strokeStyle,
    setStrokeStyle,
    isDrawingDisabled,
    setIsDrawingDisabled,
  } = useCanvas();

  const { flow, setFlow, submitHandler } = useGame2Draw({
    isDrawingDisabled,
    setIsDrawingDisabled,
    getImageUrl,
    onSubmit,
  });

  const [localEndTime, setLocalEndTime] = useState(null);

  useEffect(() => {
    const endTime = new Date(Date.now() + 30 * 1000).toISOString();
    setLocalEndTime(endTime);
  }, []);

  const handleColorChange = (color) => {
    setStrokeStyle(color);
  };

  const goToNextFlow = useCallback(() => {
    setFlow((prev) => prev + 1);
  }, [setFlow]);

  return (
    <div className="game2-draw-scene-container">
      <>
        {/* 타임오버 오버레이 */}
        {flow === 3 && <GameEndScene goToNextFlow={goToNextFlow} />}{" "}
        {/* 애니메이션만 */}
        {/* 로딩 중 오버레이 (평가 진행중) */}
        {flow === 4 && <DrawingWaiting onDone={() => {}} />}{" "}
        {/* 필요 시 prop으로 대체 */}
      </>

      {/* 좌측 툴 */}
      <DrawTools
        onTogglePen={togglePen}
        onToggleEraser={toggleEraser}
        onClearCanvas={handleClearCanvas}
        onSubmit={submitHandler}
        disabled={isDrawingDisabled}
      />
      {/* 우측 팔레트 */}
      <PaletteTools onSelectColor={handleColorChange} />
      {/* 캔버스 */}
      <div className="game2-drawing-container">
        <div className="game-header">
          {localEndTime && (
            <Timer
              endTime={localEndTime}
              flow={flow}
              goToNextFlow={goToNextFlow}
            />
          )}
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

export default Game2DrawScene;
