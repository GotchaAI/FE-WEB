import CloseIcon from "commons/svgs/XIcon";
import { useRef, useState } from "react";
import "styles/commons/modal/CodeInputModal.scss";
import { isOneDigitNumber } from "utils/validation";

const CodeInputModal = ({ title, onConfirm, onClose }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!isOneDigitNumber) return; // 숫자 1자리만 허용

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const finalCode = code.join("");
    if (finalCode.length === 4) {
      onConfirm(finalCode);
    }
  };

  return (
    <div className="code-input-modal">
      <button className="close" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="title">{title}</div>
      <div className="code-inputs">
        {code.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            className="code-box"
            value={val}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            maxLength={1}
            type="text"
          />
        ))}
      </div>
      <button className="confirm-btn" onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default CodeInputModal;
