import { useModalStore } from "store/modal";
import "styles/commons/modal/ConfirmModal2.scss";

const ConfirmModal2 = ({ message1, message2, onConfirm }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="confirm-modal">
      <div className="message1">{message1}</div>
      <div className="message2">{message2}</div>
      <div className="actions">
        <button onClick={onConfirm}>네</button>
        <span className="divider">/</span>
        <button onClick={closeModal}>아니오</button>
      </div>
    </div>
  );
};

export default ConfirmModal2;
