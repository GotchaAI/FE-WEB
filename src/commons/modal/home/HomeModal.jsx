import CloseIcon from "commons/svgs/CloseIcon";
import { useModalStore } from "store/modal";
import "styles/commons/modal/HomeModal.scss";

const HomeModal = ({ message, onConfirm }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="home-modal">
      <button className="close-btn" onClick={closeModal}>
        <CloseIcon />
      </button>
      <div className="content">{message}</div>
      <button className="confirm-btn" onClick={onConfirm}>
        확인
      </button>
    </div>
  );
};

export default HomeModal;
