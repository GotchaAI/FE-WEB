import CheckBox from 'commons/svgs/CheckBox';
import { useEffect, useState } from 'react';
import {
  putChatSetting,
  requestChatSetting,
} from 'services/lobby/setting/setting';
import 'styles/components/lobby/setting/ChatSetting.scss';

const ChatSetting = ({ save, setSave }) => {
  // const NORMAL_CHAT_TYPE = ['ALLOW_ALL', 'ALLOW_FRIEND_ONLY', 'DISALLOW'];
  // const WISPER_CHAT_TYPE = ['ALLOW', 'DISALLOW'];

  const [normalChatType, setNormalChatType] = useState('ALLOW_ALL');
  const [whisperChatType, setWhisperChatType] = useState('ALLOW');

  useEffect(() => {
    if (!save) return;
    const saveChatSetting = async () => {
      try {
        const chatSetting = {
          chatOption: normalChatType,
          privateChatOption: whisperChatType,
        };
        await putChatSetting(chatSetting);
      } catch (e) {
        console.error(e);
      }
    };
    saveChatSetting();
    setSave((prev) => !prev);
  }, [save]);

  useEffect(() => {
    const getChatSetting = async () => {
      try {
        const res = await requestChatSetting();
        setNormalChatType(res.chatOption);
        setWhisperChatType(res.privateChatOption);
      } catch (e) {
        console.error(e);
      }
    };
    getChatSetting();
  }, []);

  const normalChatOptions = [
    { label: '모두 허용', value: 'ALLOW_ALL' },
    { label: '친구만 허용', value: 'FRIENDS_ONLY' },
    { label: '모두 차단', value: 'DENY_ALL' },
  ];

  const whisperChatOptions = [
    { label: '허용', value: 'ALLOW' },
    { label: '차단', value: 'DENY' },
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
