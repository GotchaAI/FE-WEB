import { CarrotAvatar } from "commons/svgs/characters/CarrotAvatar";
import { EditButton } from "commons/svgs/EditButton";
import { EditCarrotButton } from "commons/svgs/EditCarrotButton";
import {
  MY_PAGE_EDIT_AVATAR,
  MY_PAGE_EDIT_NICKNAME,
  WITHDRAW_URL,
} from "constants/url";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "styles/pages/lobby/mypage/MyInfoPage.scss";

const MyInfoPage = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isAvatarActive = pathname.endsWith(MY_PAGE_EDIT_AVATAR);
  const isWithdrawActive = pathname.endsWith(WITHDRAW_URL);
  const handleEditNicknameClick = () => {
    nav(MY_PAGE_EDIT_NICKNAME);
  };
  const handleEditAvatarClick = () => {
    nav(MY_PAGE_EDIT_AVATAR);
  };
  const handleWithdrawClick = () => {
    //회원탈퇴 동작
  };
  return (
    <div className="my-info-container">
      <div className="user-info-panel">
        <span className="my-page-title">MY PAGE</span>

        <div className="avatar-wrapper">
          <div className={`user-avatar ${!isAvatarActive ? "dimmed" : ""}`}>
            <CarrotAvatar />
          </div>
          {!isAvatarActive && (
            <button
              className="edit-icon avatar-edit"
              ariaLabel="아바타 수정"
              onClick={handleEditAvatarClick}
              type="button"
            >
              <EditButton />
            </button>
          )}
        </div>

        <div className="info-row">
          <span className="user-nickname">불닭먹고시퍼</span>
          <button
            className="edit-icon"
            ariaLabel="닉네임 수정"
            onClick={handleEditNicknameClick}
            type="button"
          >
            <EditCarrotButton />
          </button>
        </div>

        <span className="user-email">lucas123@yu.ac.kr</span>

        {!isWithdrawActive && (
          <button
            className="withdraw-button"
            onClick={handleWithdrawClick}
            type="button"
          >
            회원탈퇴
          </button>
        )}
      </div>

      <div className="user-info-edit-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MyInfoPage;
