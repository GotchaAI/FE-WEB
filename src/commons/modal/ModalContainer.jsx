import { useModalStore } from "store/modal";
import ConfirmModal from "commons/modal/ConfirmModal";
import "styles/commons/modal/ModalContainer.scss";
import CodeInputModal from "commons/modal/CodeInputModal";
import RoomEnterModal from "commons/modal/RoomEnterModal";
import ReportModal from "commons/modal/ReportModal";
import ConfirmModal2 from "commons/modal/ConfirmModal2";
import HomeModal from "commons/modal/HomeModal";

const ModalContainer = () => {
  const { type, props, onConfirm, onCancel, closeModal } = useModalStore();

  if (!type) return null;

  const renderModal = () => {
    switch (type) {
      case "confirm":
        return (
          <ConfirmModal
            {...props}
            onConfirm={() => {
              onConfirm?.();
              closeModal();
            }}
            onCancel={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );
      case "confirm2":
        return (
          <ConfirmModal2
            {...props}
            onConfirm={() => {
              onConfirm?.();
              closeModal();
            }}
            onCancel={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );

      case "codeInput":
        return (
          <CodeInputModal
            {...props}
            onConfirm={(code) => {
              onConfirm?.(code);
              closeModal();
            }}
            onClose={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );

      case "roomEnter":
        return (
          <RoomEnterModal
            {...props}
            onConfirm={(password) => {
              onConfirm?.(password);
              closeModal();
            }}
            onClose={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );

      case "report":
        return (
          <ReportModal
            {...props}
            onConfirm={(reason) => {
              onConfirm?.(reason);
              closeModal();
            }}
            onClose={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );
      case "home":
        return (
          <HomeModal
            {...props}
            onConfirm={() => {
              onConfirm?.();
              closeModal();
            }}
            onClose={() => {
              onCancel?.();
              closeModal();
            }}
          />
        );

      // 다른 모달도 여기서 분기
      default:
        return null;
    }
  };

  const backdropClassName =
    type === "home" ? "modal-backdrop-home" : "modal-backdrop-game";

  return <div className={backdropClassName}>{renderModal()}</div>;
};

export default ModalContainer;
