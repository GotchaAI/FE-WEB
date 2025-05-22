import game_ready_btn from "assets/commons/game-ready-btn.png";
import game_ready_hover_btn from "assets/commons/game-ready-hover-btn.png";
import { useState } from "react";
import "styles/commons/svgs/GameStartButton.scss";

const GameReadyButton = ({ onClick }) => {
	const [isHover, setIsHover] = useState(false);

	const handleClick = (e) => {
		onClick?.(e); // 기존 클릭 핸들러 호출
	};

	return (
		<button
			className="game-start-svg-btn"
			onClick={handleClick}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<svg
				width="345"
				height="64"
				viewBox="0 0 345 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					className="svg-main-fill"
					d="M344.5 0.5V31.5625C344.5 49.2011 330.201 63.4999 312.562 63.5H0.5V0.5H344.5Z"
					fill={isHover ? "#f0a000" : "#FFC466"}
					stroke="black"
				/>
				<path
					className="svg-sub-fill"
					d="M344.493 34.5C344.229 50.3954 331.395 63.229 315.5 63.4932V34.5H344.493Z"
					fill="#F28110"
					stroke="black"
				/>
			</svg>

			<span className="label">
				<img
					src={isHover ? game_ready_hover_btn : game_ready_btn}
					alt="준비 버튼"
					className="start-btn-img"
				/>
			</span>
		</button>
	);
};

export default GameReadyButton;
