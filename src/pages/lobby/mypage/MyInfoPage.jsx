import { Carrot } from "commons/svgs/characters/carrot";
import { EditButton } from "commons/svgs/EditButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "styles/pages/lobby/mypage/MyInfoPage.scss";

const MyInfoPage = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isAvatarActive = pathname.endsWith("/edit-avatar");
  const isNicknameActive = pathname.endsWith("/edit-nickname");
  const isWithdrawActive = pathname.endsWith("/withdraw");

  return (
    <div className="my-info-container">
      <div className="user-info-panel">
        <span className="my-page-title">MY PAGE</span>

        <div className="avatar-wrapper">
          <div className={`user-avatar ${!isAvatarActive ? "dimmed" : ""}`}>
            <Carrot />
          </div>
          {!isAvatarActive && (
            <button
              className="edit-icon avatar-edit"
              ariaLabel="아바타 수정"
              onClick={() => nav("edit-avatar")}
              type="button"
            >
              <EditButton />
            </button>
          )}
        </div>

        <div className="info-row">
          <span className="user-nickname">불닭먹고시퍼</span>
          {!isNicknameActive && (
            <button
              className="edit-icon"
              ariaLabel="닉네임 수정"
              onClick={() => nav("edit-nickname")}
              type="button"
            >
              ✏️
            </button>
          )}
        </div>

        <span className="user-email">lucas123@yu.ac.kr</span>

        {!isWithdrawActive && (
          <button
            className="withdraw-button"
            onClick={() => nav("withdraw")}
            type="button"
          >
            회원탈퇴
          </button>
        )}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyInfoPage;
