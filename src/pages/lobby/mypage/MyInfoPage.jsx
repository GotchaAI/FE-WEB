import { Carrot } from "commons/svgs/characters/carrot";
import "styles/pages/lobby/mypage/MyInfoPage.scss";
const MyInfoPage = () => {
  return (
    <div className="my-info-container">
      <div className="user-info-panel">
        <span className="my-page-title">MY PAGE</span>
        <div className="user-avatar">
          <Carrot />
        </div>
        <span className="user-nickname">불닭먹고시퍼</span>
        <span className="user-email">lucas123@yu.ac.kr</span>
        <button className="withdraw-button">회원탈퇴</button>
      </div>
      <div> 우측 아울렛</div>
    </div>
  );
};
export default MyInfoPage;
