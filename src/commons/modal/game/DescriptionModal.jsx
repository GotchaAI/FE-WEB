import CloseIcon from "commons/svgs/CloseIcon";
import { useModalStore } from "store/modal";
import "styles/commons/modal/DescriptionModal.scss";

const DescriptionModal = ({ message }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="description-modal">
      <button className="close" onClick={closeModal}>
        <CloseIcon />
      </button>
      <div className="description-box">
        <div className="text-content">{message}</div>
      </div>
    </div>
  );
};

export default DescriptionModal;
