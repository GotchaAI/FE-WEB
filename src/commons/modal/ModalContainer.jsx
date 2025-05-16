// import ReportModal from "./modals/ReportModal";
// import AlertModal from "./modals/AlertModal";
// import ConfirmModal from "./modals/ConfirmModal";
// import RoomCodeModal from "./modals/RoomCodeModal";
// import RoomEnterModal from "./modals/RoomEnterModal";

import { useModalStore } from "store/modal";
import ConfirmModal from "./ConfirmModal";
import "styles/commons/modal/ModalContainer.scss";

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
			// 다른 모달도 여기서 분기
			default:
				return null;
		}
	};

	return <div className="modal-backdrop">{renderModal()}</div>;
};

export default ModalContainer;
