import "styles/components/lobby/waiting/WaitingRoom.scss";
import PlayerSlot from "./PlayerSlot"; // ✅ 추가
import CheckBox from "commons/svgs/CheckBox";
import GameStartButton from "commons/svgs/GameStartButton";

const WaitingRoom = () => {
	const players = [
		{ nickname: "빙구", isLeader: true, status: "나 방장ㅋ", ready: false },
		{ nickname: "엉덩이", isLeader: false, status: "준비중", ready: false },
		{
			nickname: "공동이탐정",
			isLeader: false,
			status: "준비완료!",
			ready: true,
		},
		{ nickname: "...", isLeader: false, status: "", ready: false },
	];

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
						<CheckBox label="초보" defaultChecked />
						<CheckBox label="고수" />
						<CheckBox label="신" />
					</div>
				</div>

				<div start-btn-wrapper>
					<GameStartButton />
				</div>
			</div>
		</div>
	);
};

export default WaitingRoom;
