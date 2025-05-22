import { useModalStore } from "store/modal";
import "styles/commons/modal/HomeModal.scss";

const HomeModal = ({ message, onConfirm }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="home-modal">
      <button className="close-btn" onClick={closeModal}>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.5 1.25L15 15.75" stroke="black" />
          <path d="M0.5 15.75L15 1.25" stroke="black" />
        </svg>
      </button>
      <div className="content">{message}</div>
      <button className="confirm-btn" onClick={onConfirm}>
        확인
      </button>
    </div>
  );
};

export default HomeModal;
