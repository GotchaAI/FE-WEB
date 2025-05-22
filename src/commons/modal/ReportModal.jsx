import CloseIcon from "commons/svgs/XIcon";
import { REPORT_REASONS } from "constants/reportReasons";
import { useState } from "react";
import "styles/commons/modal/ReportModal.scss";

const ReportModal = ({ reportedUser, onConfirm, onClose }) => {
  const [selected, setSelected] = useState("");
  const [etcReason, setEtcReason] = useState("");

  const handleSubmit = () => {
    if (!selected) return;
    if (selected === "기타" && etcReason.trim() === "") {
      return;
    }

    onConfirm({
      type: selected,
      content: etcReason,
    });
  };

  return (
    <div className="report-modal">
      <div className="close-btn" onClick={onClose}>
        <CloseIcon />
      </div>
      <div className="title">채팅 신고</div>

      <div className="reported-user">{reportedUser}</div>

      <div className="reason-box">
        {REPORT_REASONS.map((reason) => (
          <label key={reason} className="reason-option">
            <input
              type="radio"
              name="reportReason"
              value={reason}
              checked={selected === reason}
              onChange={() => setSelected(reason)}
            />
            {reason}
          </label>
        ))}
      </div>

      <textarea
        className="etc-input"
        placeholder={
          selected === "기타"
            ? "기타 항목 선택 시 사유 입력이 필요합니다."
            : "추가로 입력하고 싶은 사항을 작성해주세요."
        }
        value={etcReason}
        onChange={(e) => setEtcReason(e.target.value)}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        신고하기
      </button>
    </div>
  );
};

export default ReportModal;
