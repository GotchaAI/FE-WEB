import CloseButton from "commons/ui/button/CloseButton";
import { useModalStore } from "store/modal";
import "styles/commons/modal/DescriptionModal.scss";

const DescriptionModal = ({ message }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="description-modal">
      <CloseButton onClick={closeModal} />

      <div className="description-box">
        <div className="text-content">{message}</div>
      </div>
    </div>
  );
};

export default DescriptionModal;
