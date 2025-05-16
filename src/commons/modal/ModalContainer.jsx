import { useModalStore } from "store/modal";
import ConfirmModal from "./ConfirmModal";
import "styles/commons/modal/ModalContainer.scss";
import AlertModal from "./AlertModal";
import CodeInputModal from "./CodeInputModal";
import RoomEnterModal from "./RoomEnterModal";
import ReportModal from "./ReportModal";
import ConfirmModal2 from "./ConfirmModal2";
import HomeModal from "./HomeModal";

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
