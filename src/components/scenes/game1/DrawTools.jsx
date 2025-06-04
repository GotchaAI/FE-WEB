import bellImg from "assets/components/scenes/commons/bell.png";
import carrotImg from "assets/components/scenes/commons/carrot.png";
import eraserImg from "assets/components/scenes/commons/eraser.png";
import submittedImg from "assets/components/scenes/commons/submitted.png";
import trashcanImg from "assets/components/scenes/commons/trashcan.png";
import { useState } from "react";
import "styles/components/scenes/game1/DrawTools.scss";
const DrawTools = ({
  onTogglePen,
  onToggleEraser,
  onClearCanvas,
  onSubmit,
  disabled,
}) => {
  const [activeTool, setActiveTool] = useState(null);
  const handlePenClick = () => {
    setActiveTool("pen");
    onTogglePen();
  };

  const handleEraserClick = () => {
    setActiveTool("eraser");
    onToggleEraser();
  };

  // TODO: 오류 수정중
  // cursor 스타일 결정
  const cursorStyle = {
    cursor:
      activeTool === "pen"
        ? `url(${carrotImg}) 4 28, auto` // 4 28은 커서 핫스팟 위치 (적절히 조정)
        : activeTool === "eraser"
        ? `url(${eraserImg}) 4 28, auto`
        : "auto",
  };

  return (
    <div className="draw-option-container" style={cursorStyle}>
      <label
        className={`draw-tool pencil ${activeTool === "pen" ? "active" : ""}`}
        onClick={handlePenClick}
        aria-disabled={disabled}
      >
        <span>pen</span>
        <img className="carrot-img" src={carrotImg} alt="연필" />
      </label>

      <label
        className={`draw-tool eraser ${
          activeTool === "eraser" ? "active" : ""
        }`}
        onClick={handleEraserClick}
        aria-disabled={disabled}
      >
        <span>eraser</span>
        <img className="eraser-img" src={eraserImg} alt="지우개" />
      </label>

      <label
        className="draw-tool trashcan"
        onClick={onClearCanvas}
        aria-disabled={disabled}
      >
        <img className="trashcan-img" src={trashcanImg} alt="휴지통" />
      </label>

      {!disabled ? (
        <label
          className="draw-tool submit"
          onClick={onSubmit}
          aria-disabled={disabled}
        >
          <span>제출하기</span>
          <img className="bell-img" src={bellImg} alt="제출하기" />
        </label>
      ) : (
        <img className="submitted-img" src={submittedImg} alt="제출완료" />
      )}
    </div>
  );
};

export default DrawTools;
