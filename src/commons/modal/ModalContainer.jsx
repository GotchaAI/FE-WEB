// import ReportModal from "./modals/ReportModal";
// import AlertModal from "./modals/AlertModal";
// import ConfirmModal from "./modals/ConfirmModal";
// import RoomCodeModal from "./modals/RoomCodeModal";
// import RoomEnterModal from "./modals/RoomEnterModal";

import { useModalStore } from "store/modal";
import ConfirmModal from "./ConfirmModal";
import "styles/commons/modal/ModalContainer.scss";
import AlertModal from "./AlertModal";
import CodeInputModal from "./CodeInputModal";
import RoomEnterModal from "./RoomEnterModal";

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
			case "alert":
				return (
					<AlertModal
						{...props}
						onClose={() => {
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
						onClose={closeModal}
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
