import CloseIcon from "commons/svgs/CloseIcon";
import ChatSetting from "components/lobby/setting/ChatSetting";
import SoundSetting from "components/lobby/setting/SoundSetting";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/pages/lobby/SettingPage.scss";

const SettingPage = () => {
  const navigate = useNavigate();

  const [settingType, setSettingType] = useState("소리");
  const [save, setSave] = useState(false);

  const closeHandler = () => {
    navigate(-1); // 뒤로가기(이전 페이지 기억)
  };

  const saveHandler = () => {
    setSave(true);
  };

  return (
    <div className="setting-page-container">
      <div className="setting-nav-container">
        <button
          className={`sound-btn ${settingType === "소리" && "active"}`}
          onClick={() => setSettingType("소리")}
        >
          소리
        </button>
        <button
          className={`chat-btn ${settingType === "채팅" && "active"}`}
          onClick={() => setSettingType("채팅")}
        >
          채팅
        </button>
      </div>

      <div className="setting-content-container">
        <div className="close-btn">
          <CloseIcon onClick={closeHandler} />
        </div>
        <span className="title">{settingType} 설정</span>
        <div className="divide-line" />
        {settingType === "소리" ? (
          <SoundSetting save={save} setSave={setSave} />
        ) : (
          <ChatSetting save={save} setSave={setSave} />
        )}
        <button className="save-btn" onClick={saveHandler}>
          설정 완료
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
