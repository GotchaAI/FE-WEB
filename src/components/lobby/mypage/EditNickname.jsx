import CloseIcon from "commons/svgs/XIcon";
import { useNavigate } from "react-router-dom";
import "styles/components/lobby/mypage/EditNickname.scss";
export const EditNickname = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/lobby/myinfo");
  };
  return (
    <div className="edit-nickname-container">
      <button className="close-btn" onClick={handleClose}>
        <CloseIcon />
      </button>
      <span className="edit-nickname-title">닉네임 설정</span>
      <p className="edit-nickname-notification">
        (최대 한글 6자 영문 12자 입력 가능)
        <br />
        변경 후 24시간 뒤 재변경이 가능합니다.
      </p>
      <div className="nickname-input-wrapper">
        <input
          type="text"
          placeholder="닉네임적는곳"
          className="nickname-input"
        />
        <button className="duplicate-check-btn">중복확인</button>
      </div>
      <button className="submit-nickname-btn">변경하기</button>
    </div>
  );
};
