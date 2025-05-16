import "styles/commons/modal/ConfirmModal.scss";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
	return (
		<div className="confirm-modal">
			<div className="message">{message}</div>
			<div className="actions">
				<button onClick={onConfirm}>네</button>
				<span className="divider">/</span>
				<button onClick={onCancel}>아니오</button>
			</div>
		</div>
	);
};

export default ConfirmModal;
