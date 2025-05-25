import { useModalStore } from "store/modal";
import ConfirmModal from "commons/modal/lobby/ConfirmModal";
import "styles/commons/modal/ModalContainer.scss";
import CodeInputModal from "commons/modal/lobby/CodeInputModal";
import RoomEnterModal from "commons/modal/lobby/RoomEnterModal";
import ReportModal from "commons/modal/lobby/ReportModal";
import ConfirmModal2 from "commons/modal/lobby/ConfirmModal2";
import HomeModal from "commons/modal/home/HomeModal";
import { useEffect } from "react";

const ModalContainer = () => {
  const { type, props, onConfirm, closeModal } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

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
          />
        );

      // 다른 모달도 여기서 분기
      default:
        return null;
    }
  };

  const backdropClassName =
    type === "home" ? "modal-backdrop-home" : "modal-backdrop-game";

  return (
    <div className={backdropClassName} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>{renderModal()}</div>
    </div>
  );
};

export default ModalContainer;
