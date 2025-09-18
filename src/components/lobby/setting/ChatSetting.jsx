import CheckBox from "commons/svgs/CheckBox";
import { useState } from "react";
import "styles/components/lobby/setting/ChatSetting.scss";

const ChatSetting = () => {
  const [normalChatType, setNormalChatType] = useState(0);
  const [whisperChatType, setWhisperChatType] = useState(0);

  const normalChatOptions = [
    { label: "모두 허용", value: 0 },
    { label: "친구만 허용", value: 1 },
    { label: "모두 차단", value: 2 },
  ];

  const whisperChatOptions = [
    { label: "허용", value: 0 },
    { label: "차단", value: 1 },
  ];

  return (
    <div className="chat-setting-container">
      <div className="chat-setting">
        <div className="normal-chat-setting">
          <span className="normal-chat-title">일반 채팅</span>

          {normalChatOptions.map(({ label, value }) => (
            <CheckBox
              key={`normal-${value}`}
              label={label}
              checked={normalChatType === value}
              styleDisabled={normalChatType !== value}
              onChange={() => setNormalChatType(value)}
            />
          ))}
        </div>

        <div className="whisper-chat-setting">
          <span className="whisper-chat-title">귓속말 채팅</span>

          {whisperChatOptions.map(({ label, value }) => (
            <CheckBox
              key={`whisper-${value}`}
              label={label}
              checked={whisperChatType === value}
              styleDisabled={whisperChatType !== value}
              onChange={() => setWhisperChatType(value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;
