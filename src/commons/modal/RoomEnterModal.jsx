import { useState } from "react";
import "styles/commons/modal/RoomEnterModal.scss";

const RoomEnterModal = ({
	roomType,
	hostName,
	roomName,
	onConfirm,
	onClose,
}) => {
	const [password, setPassword] = useState("");

	const handleEnter = () => {
		if (password.length > 0) {
			onConfirm(password);
		}
	};

	return (
		<div className="room-enter-modal">
			<button className="close-btn" onClick={onClose}>
				<svg
					width="16"
					height="15"
					viewBox="0 0 16 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.1476 13.8524C15.2029 13.9039 15.2472 13.966 15.278 14.035C15.3087 14.104 15.3252 14.1785 15.3266 14.254C15.3279 14.3295 15.314 14.4045 15.2857 14.4746C15.2574 14.5446 15.2153 14.6082 15.1619 14.6617C15.1085 14.7151 15.0449 14.7572 14.9748 14.7855C14.9048 14.8138 14.8298 14.8277 14.7542 14.8263C14.6787 14.825 14.6042 14.8085 14.5352 14.7777C14.4662 14.747 14.4041 14.7027 14.3526 14.6474L8.00013 8.29582L1.64763 14.6474C1.541 14.7467 1.39996 14.8008 1.25424 14.7983C1.10851 14.7957 0.969472 14.7367 0.866413 14.6336C0.763353 14.5305 0.704319 14.3915 0.701748 14.2458C0.699177 14.1001 0.753269 13.959 0.852629 13.8524L7.20419 7.49988L0.852629 1.14739C0.753269 1.04075 0.699177 0.899719 0.701748 0.753993C0.704319 0.608267 0.763353 0.469228 0.866413 0.366168C0.969472 0.263109 1.10851 0.204075 1.25424 0.201504C1.39996 0.198932 1.541 0.253025 1.64763 0.352385L8.00013 6.70395L14.3526 0.352385C14.4593 0.253025 14.6003 0.198932 14.746 0.201504C14.8917 0.204075 15.0308 0.263109 15.1338 0.366168C15.2369 0.469228 15.2959 0.608267 15.2985 0.753993C15.3011 0.899719 15.247 1.04075 15.1476 1.14739L8.79607 7.49988L15.1476 13.8524Z"
						fill="black"
					/>
				</svg>
			</button>
			<div className="title">입장</div>

			<div className="room-type">{roomType}</div>

			<div className="room-info-box">
				<div className="host-line">
					{/* 왕관이미지 추가 예정 */}
					<span className="host-name">{hostName}</span>
				</div>
				<div className="room-name">{roomName}</div>
			</div>

			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="password-input"
			/>

			<button className="enter-btn" onClick={handleEnter}>
				입장하기
			</button>
		</div>
	);
};

export default RoomEnterModal;
