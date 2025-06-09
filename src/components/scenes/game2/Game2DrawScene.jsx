import Timer from "commons/Timer";
import DrawTools from "components/scenes/game1/DrawTools";
import useCanvas from "hooks/game/game1/useCanvas";
import "styles/components/scenes/game2/Game2DrawScene.scss";
import PaletteTools from "./PaletteTools";

/**
 * DrawScene (Simplified) : 그림 그리기만 하는 Scene
 *
 * - 펜/지우개/클리어/제출 기능
 * - 캔버스 그리기
 * - flow / Timer / StartScene / EndScene 제거
 */

const Game2DrawScene = ({ onSubmit }) => {
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
  } = useCanvas();

  const goToNextFlow = () => {};

  const handleColorChange = (color) => {
    // setStrokeStyle(color);
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    const imageUrl = await getImageUrl();
    if (onSubmit) {
      onSubmit(imageUrl);
    }
  };

  return (
    <div className="game2-draw-scene-container">
      {/* 버튼 그룹 */}
      <DrawTools
        onTogglePen={togglePen}
        onToggleEraser={toggleEraser}
        onClearCanvas={handleClearCanvas}
        onSubmit={handleSubmit}
        disabled={isDrawingDisabled}
      />

      {/* 우측 PaletteTools */}
      <PaletteTools onSelectColor={handleColorChange} />

      {/* 캔버스 */}
      <div className="game2-drawing-container">
        <div className="game-header">
          {/* 타이머 ⏰*/}
          <Timer endTime={100000} flow={1} goToNextFlow={goToNextFlow} />
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
