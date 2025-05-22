import { useModalStore } from "store/modal";
import "styles/commons/modal/ConfirmModal.scss";

const ConfirmModal = ({ message, onConfirm }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="confirm-modal">
      <div className="message">{message}</div>
      <div className="actions">
        <button onClick={onConfirm}>네</button>
        <span className="divider">/</span>
        <button onClick={closeModal}>아니오</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
