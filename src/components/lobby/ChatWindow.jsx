/**
 * 로비 채팅 window
 *
 * 기능:
 * - 채팅 메시지 출력
 * - 스크롤 시 스크롤 위치에 따라 메시지 출력
 *
 * props:
 * @param {Array} messages - 채팅 메시지 배열
 * @param {string} myNickname - 내 닉네임
 * @param {Object} chatWindowRef - 채팅 창의 ref
 * @param {Function} handleScroll - 스크롤 핸들러
 *
 * 구성 요소:
 * - 채팅 메시지 리스트: messages 배열을 기반으로 채팅 메시지를 렌더링
 * - 채팅 메시지: 각 메시지를 ChatMessage 컴포넌트를 사용하여 렌더링
 * - 채팅 닉네임: 메시지의 발신자가 내 닉네임이 아닐 경우에만 표시
 * - 채팅 타입: 메시지의 타입에 따라 귓속말 또는 일반채팅으로 표시
 */
import React from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages, myNickname, chatWindowRef, handleScroll }) => {
  return (
    <div className="chat-window" ref={chatWindowRef} onScroll={handleScroll}>
      <span className="chat-header">귓속말 @ 닉네임</span>
      {messages.map((msg) => (
        <ul
          key={msg.id}
          className={`chat-message ${
            msg.sender === myNickname ? "mine" : "theirs"
          }`}
        >
          {msg.sender !== myNickname && (
            <span className="chat-nickname">{msg.sender}</span>
          )}
          <ChatMessage msg={msg} myNickname={myNickname} />
        </ul>
      ))}
    </div>
  );
};

export default ChatWindow;
