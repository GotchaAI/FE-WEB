import CloseIcon from "commons/svgs/XIcon";
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
        <CloseIcon />
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
