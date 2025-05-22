import CloseIcon from "commons/svgs/XIcon";
import { useState } from "react";
import { useModalStore } from "store/modal";
import "styles/commons/modal/RoomEnterModal.scss";
import { isNumeric } from "utils/validation";

const RoomEnterModal = ({ roomType, hostName, roomName, onConfirm }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPassword(value);
    }
  };

  const handleEnter = () => {
    if (password.length > 0) {
      onConfirm(password);
    }
  };

  return (
    <div className="room-enter-modal">
      <button className="close-btn" onClick={closeModal}>
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
        onChange={handlePasswordChange}
        className="password-input"
      />

      <button className="enter-btn" onClick={handleEnter}>
        입장하기
      </button>
    </div>
  );
};

export default RoomEnterModal;
