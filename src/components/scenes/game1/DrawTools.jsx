import bellImg from "assets/components/scenes/commons/bell.png";
import carrotImg from "assets/components/scenes/commons/carrot.png";
import eraserImg from "assets/components/scenes/commons/eraser.png";
import submittedImg from "assets/components/scenes/commons/submitted.png";
import trashcanImg from "assets/components/scenes/commons/trashcan.png";
import carrotCurosr from "assets/cursor/carrot.png";
import eraserCurosr from "assets/cursor/eraser.png";
import useEffectSound from "hooks/game/game1/useEffectSound";
import { useEffect, useState } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game1/DrawTools.scss";
const DrawTools = ({
  onTogglePen,
  onToggleEraser,
  onClearCanvas,
  onSubmit,
  disabled,
}) => {
  const [activeTool, setActiveTool] = useState("pen");
  const { playEffect } = useEffectSound();
  const handlePenClick = () => {
    setActiveTool("pen");
    onTogglePen();
  };

  const handleEraserClick = () => {
    setActiveTool("eraser");
    onToggleEraser();
  };

  const submitHandler = () => {
    useToastStore.getState().showToast("alert", "제출 완료!!!");
    playEffect("pling");
    onSubmit();
  };

  // cursor 스타일 결정
  useEffect(() => {
    const body = document.body;
    if (activeTool === "pen") {
      body.style.cursor = `url(${carrotCurosr}) 4 28, auto`;
    } else if (activeTool === "eraser") {
      body.style.cursor = `url(${eraserCurosr}) 4 28, auto`;
    } else {
      body.style.cursor = "auto";
    }

    // 컴포넌트 언마운트 시 커서 원복
    return () => {
      body.style.cursor = "auto";
    };
  }, [activeTool]);

  return (
    <div className="draw-option-container">
      <button
        type="button"
        className={`draw-tool pencil ${activeTool === "pen" ? "active" : ""}`}
        onClick={handlePenClick}
        disabled={disabled}
      >
        <span>pen</span>
        <img className="carrot-img" src={carrotImg} alt="연필" />
      </button>

      <button
        type="button"
        className={`draw-tool eraser ${
          activeTool === "eraser" ? "active" : ""
        }`}
        onClick={handleEraserClick}
        disabled={disabled}
      >
        <span>eraser</span>
        <img className="eraser-img" src={eraserImg} alt="지우개" />
      </button>

      <button
        type="button"
        className="draw-tool trashcan"
        onClick={onClearCanvas}
        disabled={disabled}
      >
        <img className="trashcan-img" src={trashcanImg} alt="휴지통" />
      </button>

      {!disabled ? (
        <button
          type="button"
          className="draw-tool submit"
          onClick={submitHandler}
          disabled={disabled}
        >
          <span>제출하기</span>
          <img className="bell-img" src={bellImg} alt="제출하기" />
        </button>
      ) : (
        <img className="submitted-img" src={submittedImg} alt="제출완료" />
      )}
    </div>
  );
};

export default DrawTools;
