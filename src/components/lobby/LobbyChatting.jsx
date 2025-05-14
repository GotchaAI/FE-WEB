import React, { useState, useRef, useEffect } from "react";
import chattingLob from "assets/chattingLob.png";
import "styles/components/lobby/LobbyChatting.scss";
import SendButton from "commons/svgs/SendButton";
import { isBlank } from "utils/validation";
import throttle from "lodash.throttle";
import ChatWindow from "./ChatWindow";
/**
 * 로비 채팅 컴포넌트
 *
 * - 로비에서의 채팅 기능을 담당하는 UI 컴포넌트
 * - 채팅 메시지 전송, 채팅 타입 선택(귓속말/일반채팅), 메시지 스크롤 관리 등
 *
 * props:
 * @param {string} errorMessage - 채팅 실패 시 출력할 에러 메시지 -> 추후 api 구현완료 되면 추가할 예정
 *
 * 구성 요소:
 * - 채팅 메시지 리스트: messages 배열을 기반으로 채팅 메시지를 렌더링
 * - 채팅 입력창: 사용자가 메시지를 입력하고 전송할 수 있는 textarea
 * - 채팅 타입 선택: 일반채팅/귓속말을 선택할 수 있는 드롭다운 메뉴
 * - 스크롤 관리: 채팅 메시지가 추가될 때 자동으로 스크롤을 아래로 이동
 * - @ 추가/제거: 귓속말일 때 @가 없으면 추가, 일반채팅으로 바꿀 때 제일 앞에 @가 있으면 제거
 * - 채팅 테스트 코드 : 랜덤 사용자와 메시지를 생성하여 5초마다 메시지를 추가하는 테스트 코드 (추후 삭제 예정)
 */
const LobbyChatting = ({ errorMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatType, setChatType] = useState("일반채팅");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const chatWindowRef = useRef(null);
  const [sendTimestamps, setSendTimestamps] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // 채팅 메시지의 고유 ID 생성 함수
  // 메시지 전송 시 고유 ID를 생성하여 메시지에 추가
  const generateId = () =>
    Date.now() + "_" + Math.floor(Math.random() * 100000);

  //채팅 테스트 부분
  const myNickname = "me";
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUsers = ["Alice", "Bob", "Charlie"];
      const sampleTexts = [
        "안녕하세요!",
        "뭐하고 계세요?",
        "좋은 하루 되세요~",
        "테스트 메시지입니다.",
      ];
      const sampleTypes = ["일반채팅", "귓속말", "귓속말", "일반채팅"];
      const sender =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      const type = sampleTypes[Math.floor(Math.random() * sampleTexts.length)];
      setMessages((prev) => [
        ...prev,
        { id: generateId(), sender, text, type },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  // 채팅 테스트 코드 끝

  // 메시지 전송 핸들러
  // 입력값이 공백이 아닐 때만 메시지 전송
  // 메시지 전송 후 스크롤을 바닥으로 이동
  // 채팅 타입을 일반채팅으로 초기화
  // 메시지 전송 시 고유 ID를 생성하여 메시지에 추가

  const handleSendMessage = () => {
    const now = Date.now();

    // 최근 10초 내 메시지 필터링
    const recent = sendTimestamps.filter((t) => now - t < 10000);

    if (recent.length >= 5) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 10000);
      return;
    }

    if (
      !isBlank(input) ||
      (chatType === "귓속말" &&
        input.startsWith("@") &&
        input.trim().length > 1)
    ) {
      setMessages((prev) => [
        ...prev,
        { id: generateId(), sender: myNickname, text: input, type: chatType },
      ]);
      setSendTimestamps([...recent, now]); // 업데이트
      setInput("");
      setIsAtBottom(true);
      setChatType("일반채팅");
    }
  };

  // 채팅 타입 변경 시 @ 추가/제거
  // 귓속말일 때 @가 없으면 추가, 일반채팅일 때 @가 있으면 제거
  useEffect(() => {
    setInput((prevInput) => {
      if (chatType === "귓속말" && !prevInput.startsWith("@")) {
        return prevInput.trim() ? `@ ${prevInput}` : "@";
      } else if (chatType === "일반채팅" && prevInput.startsWith("@")) {
        return prevInput.replace(/^@\s*/, "");
      }
      return prevInput;
    });
  }, [chatType]);

  // @닉네임 입력시 자동 모드 변환
  // @로 시작하고 닉네임 + 공백이 있는 경우 -> 귓속말 모드로 전환
  // @로 시작하지 않으면 일반채팅 모드로 전환
  useEffect(() => {
    const trimmedInput = input.trimStart();

    const hasWhisperPattern = /^@\S+\s/.test(trimmedInput);
    const hasAtSymbol = trimmedInput.startsWith("@");

    setChatType((prevType) => {
      if (hasWhisperPattern && prevType !== "귓속말") {
        return "귓속말";
      } else if (!hasAtSymbol && prevType !== "일반채팅") {
        return "일반채팅";
      }
      return prevType; // 상태 변경 불필요
    });
  }, [input]);

  // 스크롤 관리: 메시지가 추가될 때 자동으로 스크롤을 아래로 이동
  // 스크롤이 바닥에 있을 때만 스크롤 이동
  useEffect(() => {
    if (isAtBottom && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  // 스크롤 이벤트 핸들러: 스크롤 위치에 따라 isAtBottom 상태 업데이트
  // 스크롤이 바닥에 가까워지면 isAtBottom을 true로 설정

  const handleScroll = throttle(() => {
    const el = chatWindowRef.current;
    if (!el) return;
    const threshold = 50;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  return (
    <div className="lobby-chatting-container">
      <img
        src={chattingLob}
        alt="채팅방 배경"
        className="lobby-chatting-background"
      />
      <ChatWindow
        messages={messages}
        myNickname={myNickname}
        chatWindowRef={chatWindowRef}
        handleScroll={handleScroll}
        isRateLimited={isRateLimited}
      />
      <div className="chat-mode-dropdown">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`chat-mode-btns ${chatType === "귓속말" ? "whisper" : ""}`}
        >
          {chatType}
        </button>

        {isDropdownOpen && (
          <ul className="chat-mode-menu">
            {["일반채팅", "귓속말"]
              .filter((mode) => mode !== chatType)
              .map((mode) => (
                <li
                  key={mode}
                  className={mode === "귓속말" ? "whisper" : "entire-mode"}
                  onClick={() => {
                    setChatType(mode);
                    setIsDropdownOpen(false);
                  }}
                >
                  {mode}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setInput(e.target.value);
            }
          }}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="채팅을 입력해주세요.(100자 이내)"
        />
        <button className="chat-send-btn" onClick={handleSendMessage}>
          <SendButton />
        </button>
      </div>
    </div>
  );
};

export default LobbyChatting;
