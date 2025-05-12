import roomKingIcon from "assets/components/lobby/room-king-icon.png";
import blockedSlot from "assets/components/lobby/player-slot-blocked.png";
import roomKingRabbit from "assets/components/lobby/room-king-rabbit.png";
import preparingRabbit from "assets/components/lobby/room-preparing-rabbit.png";
import readyRabbit from "assets/components/lobby/room-ready-rabbit.png";

import "styles/components/lobby/waiting/PlayerSlot.scss";

const PlayerSlot = ({ index, player }) => {
	return (
		<div className={`player-slot ${!player ? "empty" : ""}`}>
			{player ? (
				<>
					<div className="slot-header">
						<div className="icon-wrapper">
							{player.isLeader ? (
								<img src={roomKingIcon} alt="방장" className="leader-icon" />
							) : (
								<div className="default-icon">{index + 1}</div>
							)}
						</div>
						<div className="nickname">{player.nickname}</div>
					</div>

					<div className="slot-body">
						<img
							src={
								player.isLeader
									? roomKingRabbit
									: player.ready
									? readyRabbit
									: preparingRabbit
							}
							width="135"
							height="70"
							alt="상태 말풍선"
						/>
					</div>
				</>
			) : (
				// 플레이어가 들어오지 못하는 슬롯
				<div className="slot-number empty">
					<div className="slot-header">
						<div className="icon-wrapper">
							<div className="blocked-icon">{index + 1}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerSlot;
