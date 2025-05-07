import start_active_btn from "assets/commons/start-active-btn.png";
import start_btn from "assets/commons/start-btn.png";
import start_hover_btn from "assets/commons/start-hover-btn.png";
import { useState } from "react";

const StartButton = ({ onClick }) => {
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    onClick?.(e); // 기존 클릭 핸들러 호출
  };
  console.log(isClicked);
  return (
    <button
      className="start-svg-btn"
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <svg
        viewBox="0 0 434 97"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="게임 시작 버튼"
      >
        <title>게임 시작</title>
        <desc>게임을 시작하는 버튼입니다</desc>
        <path
          className="svg-main-fill"
          d="M432.635 1.31396V55.2153C432.635 77.567 414.515 95.687 392.163 95.687H1.41235V1.31396H432.635Z"
          fill={isClicked ? "#F28110" : isHover ? "#f0a000" : "#FFC466"}
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          className="svg-sub-fill"
          d="M432.735 51.5771V55.2148C432.735 77.5664 414.616 95.6864 392.265 95.6865H386.765V51.5771H432.735Z"
          fill={isClicked ? "#7E5615" : "#F28110"}
          stroke="black"
          strokeWidth="1.5"
        />
      </svg>
      <span className="label">
        <img
          src={
            isClicked ? start_active_btn : isHover ? start_hover_btn : start_btn
          }
          alt="시작 버튼"
          className="start-btn-img"
        />
      </span>
    </button>
  );
};

export default StartButton;
