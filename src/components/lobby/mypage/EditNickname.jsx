import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "styles/components/lobby/mypage/EditNickname.scss";
import { isValidNickname } from "utils/validation";
import { checkNicknameDuplicateAPI } from "services/user/user";
import { MY_PAGE_URL } from "constants/url";
import CloseIcon from "commons/svgs/CloseIcon";

export const EditNickname = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate(MY_PAGE_URL);

  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'available' | 'duplicate' | 'cooldown'
  const valid = isValidNickname(nickname); // 여기서 유틸 함수 호출

  //닉네임 수정 api가 없음 아직
  const handleDuplicateCheck = () => {
    if (!valid) return;
    const mockCooldown = false;
    const mockDuplicate = checkNicknameDuplicateAPI(nickname);

    if (mockCooldown) return setStatus("cooldown");
    if (mockDuplicate) return setStatus("duplicate");
    return setStatus("available");
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setStatus("idle");
  };

  return (
    <div className="edit-nickname-container">
      <button className="close-btn" onClick={handleClose}>
        <CloseIcon />
      </button>

      <span className="edit-nickname-title">닉네임 설정</span>
      <p className="edit-nickname-notification">
        (닉네임은 한글, 영문, 숫자 조합의 2~6자리)
        <br />
        변경 후 24시간 뒤 재변경이 가능합니다.
      </p>

      <div className={`nickname-input-wrapper ${valid ? "is-valid" : ""}`}>
        <input
          type="text"
          placeholder="닉네임적는곳"
          className="nickname-input"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <button
          className={`duplicate-check-btn ${valid ? "enabled" : ""}`}
          onClick={handleDuplicateCheck}
          disabled={!valid}
        >
          중복확인
        </button>
      </div>

      {status === "duplicate" && (
        <p className="help-text error">
          이미 존재하는 닉네임이거나
          <br />
          최근 닉네임을 바꾼 이력이 있습니다.
        </p>
      )}
      {status === "cooldown" && (
        <p className="help-text error">
          최근 닉네임을 변경하여 24시간 후에 다시 변경할 수 있습니다.
        </p>
      )}
      {status === "available" && (
        <p className="help-text success">사용 가능한 닉네임 입니다!</p>
      )}

      <button className="submit-nickname-btn" disabled={status !== "available"}>
        변경하기
      </button>
    </div>
  );
};
