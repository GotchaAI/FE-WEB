import "styles/components/lobby/waiting/WaitingRoom.scss";
import PlayerSlot from "./PlayerSlot"; // ✅ 추가

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

					<div className="options">
						<label className="option">
							<input type="radio" name="difficulty" defaultChecked />
							{/* <span className="custom-check"></span> */}
							초보
						</label>

						<label className="option">
							<input type="radio" name="difficulty" />
							<span className="custom-check"></span>
							고수
						</label>
						<label className="option">
							<input type="radio" name="difficulty" />
							<span className="custom-check"></span>신
						</label>
					</div>
				</div>

				<button className="start-button">START</button>
			</div>
		</div>
	);
};

export default WaitingRoom;
