import React from "react";
import "styles/components/lobby/ChatMessage.scss";

/**
 * 로비 채팅 메시지 컴포넌트
 *
 * - 로비에서의 채팅 메시지를 렌더링하는 UI 컴포넌트
 * - 메시지의 발신자에 따라 스타일을 다르게 적용
 *
 * props:
 * @param {Object} msg - 채팅 메시지 객체
 * @param {string} myNickname - 현재 사용자 닉네임
 *
 * 구성 요소:
 * - 채팅 메시지: 발신자에 따라 'mine' 또는 'theirs' 클래스를 적용하여 스타일을 다르게 설정
 * - 귓속말 처리: 귓속말 메시지의 경우 '@'로 시작하는 닉네임을 강조 표시
 * - 일반채팅 처리: 일반채팅 메시지는 별도의 스타일 없이 텍스트만 표시
 */
const ChatMessage = ({ msg, myNickname }) => {
  const role = msg.sender === myNickname ? "mine" : "theirs";
  const mode = msg.type === "일반채팅" ? "" : "whisper";

  const renderFormattedMessage = () => {
    if (msg.type === "귓속말" && msg.text.startsWith("@")) {
      const match = msg.text.match(/^(@\S+)(\s*)([\s\S]*)$/);
      if (match) {
        const [, nickname, space, rest] = match;
        return (
          <>
            <strong>{nickname}</strong>
            {space}
            {rest}
          </>
        );
      }
    }

    return msg.text;
  };

  return (
    <li className={`chat-bubble ${role} ${mode}`}>
      {renderFormattedMessage()}
    </li>
  );
};

export default ChatMessage;
