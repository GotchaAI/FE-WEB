import { useCallback, useEffect, useState } from "react";
import Timer from "commons/Timer";
import DrawTools from "components/scenes/game1/DrawTools";
import useCanvas from "hooks/game/game1/useCanvas";
import GameEndScene from "components/scenes/commons/GameEndScene";
import DrawingWaiting from "components/scenes/game2/DrawingWaiting";
import PaletteTools from "./PaletteTools";
import "styles/components/scenes/game2/Game2DrawScene.scss";
import useGame2Draw from "hooks/game/game2/useGame2Draw";

/**
 * Game2DrawScene 컴포넌트
 *
 * Game2의 핵심 드로잉 씬을 구성하는 컴포넌트입니다.
 * - 사용자가 그림을 그릴 수 있는 캔버스 영역과 그리기 도구, 팔레트, 타이머 등을 포함합니다.
 * - 시간이 종료되거나 제출 시 자동으로 평가를 요청하고 다음 단계로 진행합니다.
 * - 평가 결과를 기다리는 동안 대기 UI를 표시합니다.
 *
 * Props:
 * - gameData: 게임 진행 정보를 담은 객체 (keyword, description 등 포함)
 * - onSubmit: 사용자의 드로잉을 제출하는 콜백 함수
 * - onNext: 드로잉 종료 후 결과 화면으로 전환할 때 호출되는 함수
 *
 * Todo:
 * - description 보여주는 모달 추가 예정
 */

const Game2DrawScene = ({ gameData, onSubmit, onNext }) => {
  // 캔버스 제어 훅 사용
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

  // 드로잉 흐름 관리 훅 (플로우 값에 따라 다른 상태 렌더링)
  const { flow, setFlow, submitHandler } = useGame2Draw({
    isDrawingDisabled,
    setIsDrawingDisabled,
    getImageUrl,
    onSubmit,
  });

  // 타이머 종료 시점 (60초 후)
  const [localEndTime, setLocalEndTime] = useState(null);
  useEffect(() => {
    const endTime = new Date(Date.now() + 60 * 1000).toISOString();
    setLocalEndTime(endTime);
  }, []);

  // 평가 완료 시 호출 → 결과 씬으로 전환
  const handleDone = () => {
    onNext();
  };

  // 컬러 선택 시 스트로크 색상 변경
  const handleColorChange = (color) => {
    setStrokeStyle(color);
  };

  // flow 상태 증가 (플로우 전환)
  const goToNextFlow = useCallback(() => {
    setFlow((prev) => prev + 1);
  }, [setFlow]);

  return (
    <div className="game2-draw-scene-container">
      <>
        {/* 시간 종료 시 애니메이션 오버레이 표시 */}
        {flow === 3 && <GameEndScene goToNextFlow={goToNextFlow} />}

        {/* 평가 요청 중 표시되는 대기 오버레이 */}
        {flow === 4 && <DrawingWaiting onDone={handleDone} />}
      </>

      {/* 좌측 툴바 - 펜, 지우개, 제출 등 */}
      <DrawTools
        onTogglePen={togglePen}
        onToggleEraser={toggleEraser}
        onClearCanvas={handleClearCanvas}
        onSubmit={submitHandler}
        disabled={isDrawingDisabled}
      />

      {/* 우측 컬러 팔레트 */}
      <PaletteTools onSelectColor={handleColorChange} />

      {/* 드로잉 캔버스 영역 */}
      <div className="game2-drawing-container">
        <div className="game-header">
          {/* 타이머 컴포넌트 - 시간이 다 되면 자동으로 flow 증가 */}
          {localEndTime && (
            <Timer
              endTime={localEndTime}
              flow={flow}
              goToNextFlow={goToNextFlow}
            />
          )}
        </div>

        {/* 드로잉 캔버스 */}
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
