import { useState } from "react";
import "styles/components/lobby/waiting/WaitingRoom.scss";
import PlayerSlot from "./PlayerSlot";
import CheckBox from "commons/svgs/CheckBox";
import GameStartButton from "commons/svgs/GameStartButton";
import GameReadyButton from "commons/svgs/GameReadyButton";

const WaitingRoom = () => {
	const players = [
		{ nickname: "빙구", isLeader: true, ready: false },
		{ nickname: "엉덩이", isLeader: false, ready: false },
		{ nickname: "공동이탐정", isLeader: false, ready: true },
		{ nickname: "...", isLeader: false, ready: false },
	];

	const [selectedDifficulty, setSelectedDifficulty] = useState("초보");

	return (
		<div className="waiting-room-container">
			<header className="room-info-header">
				#9804 &nbsp; 성인만/19/여기보통 뭐적지? /19시출
			</header>

			<div className="player-grid">
				{Array.from({ length: 8 }, (_, i) => (
					<PlayerSlot key={i} index={i} player={players[i]} />
				))}
			</div>

			<div className="settings-start">
				<div className="difficulty-selector">
					<span className="label">로봇 성능</span>

					<div className="checkbox-options">
						<CheckBox
							key={"초보" + selectedDifficulty}
							label="초보"
							defaultChecked={selectedDifficulty === "초보"}
							onChange={() => setSelectedDifficulty("초보")}
						/>
						<CheckBox
							key={"고수" + selectedDifficulty}
							label="고수"
							defaultChecked={selectedDifficulty === "고수"}
							onChange={() => setSelectedDifficulty("고수")}
						/>
						<CheckBox
							key={"신" + selectedDifficulty}
							label="신"
							defaultChecked={selectedDifficulty === "신"}
							onChange={() => setSelectedDifficulty("신")}
						/>
					</div>
				</div>

				<div className="start-btn-wrapper">
					<GameStartButton />
					{/* <GameReadyButton /> */}
				</div>
			</div>
		</div>
	);
};

export default WaitingRoom;
