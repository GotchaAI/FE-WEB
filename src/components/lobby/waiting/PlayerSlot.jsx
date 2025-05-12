import "styles/components/lobby/waiting/PlayerSlot.scss";

const PlayerSlot = ({ index, player }) => {
	return (
		<div className={`player-slot ${!player ? "empty" : ""}`}>
			{player ? (
				<>
					{player.isLeader && <div className="leader-badge">👑</div>}
					<div className="nickname">
						<span className="slot-number">{index + 1}</span> {player.nickname}
					</div>
					<div className="avatar">🐰</div>
					{player.status && (
						<div
							className={`status-bubble ${
								player.ready ? "ready" : "not-ready"
							}`}
						>
							{player.status}
						</div>
					)}
				</>
			) : (
				<div className="slot-number empty">{index + 1}</div>
			)}
		</div>
	);
};

export default PlayerSlot;
