import React from "react";
/**
 * 로비 채팅 메시지 컴포넌트
 *
 * - 로비에서의 채팅 메시지를 렌더링하는 UI 컴포넌트
 * - 메시지의 발신자에 따라 스타일을 다르게 적용
 *
 * props:
 * @param {Object} msg - 채팅 메시지 객체
 *
 * 구성 요소:
 * - 발신자에 따라 다른 스타일 적용: 발신자가 나일 경우 "mine" 클래스를, 그렇지 않을 경우 "theirs" 클래스를 적용
 * - 메시지 타입에 따라 다른 스타일 적용: 일반채팅일 경우 "" 클래스를, 귓속말일 경우 "whisper" 클래스를 적용
 * - 메시지 내용은 줄바꿈을 고려하여 렌더링
 * - 임시로 myNickname을 props로 받아서 사용 추후에 전역상태로 저장할 정보가 확정되면 수정 필요
 */
const ChatMessage = ({ msg, myNickname }) => {
  const role = msg.sender === myNickname ? "mine" : "theirs";
  const mode = msg.type === "일반채팅" ? "" : "whisper";

  return <li className={`chat-bubble ${role} ${mode}`}>{msg.text}</li>;
};

export default ChatMessage;
