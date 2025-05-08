import React, { useState, useRef, useEffect } from "react";
import chattingLob from "assets/chattingLob.png";
import "styles/components/lobby/LobbyChatting.scss";
import { type } from "@testing-library/user-event/dist/type";

const LobbyChatting = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatType, setChatType] = useState("일반채팅");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const chatWindowRef = useRef(null);

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
      setMessages((prev) => [...prev, { sender, text, type }]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (input.replace(/\s/g, "") !== "") {
      setMessages((prev) => [
        ...prev,
        { sender: myNickname, text: input, type: chatType },
      ]);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatType === "귓속말" && !input.startsWith("@")) {
      setInput((prev) => (prev.trim() ? `@ ${prev}` : "@"));
    } else if (chatType === "일반채팅" && input.startsWith("@")) {
      setInput((prev) => prev.replace(/^@\s*/, ""));
    }
  }, [chatType]);

  useEffect(() => {
    if (isAtBottom && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const el = chatWindowRef.current;
    if (!el) return;
    const threshold = 50;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  };

  return (
    <div className="lobby-chatting-container">
      <img src={chattingLob} className="lobby-chatting-background" />
      <div className="chat-window" ref={chatWindowRef} onScroll={handleScroll}>
        <span className="chat-header">귓속말 @ 닉네임</span>
        {messages.map((msg, index, type) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === myNickname ? "mine" : "theirs"
            }`}
          >
            {msg.sender !== myNickname && (
              <div className="chat-nickname">{msg.sender}</div>
            )}
            <div
              className={`chat-bubble ${
                msg.sender === myNickname
                  ? `mine ${msg.type === "일반채팅" ? "" : "whisper"}`
                  : `theirs ${msg.type === "일반채팅" ? "" : "whisper"}`
              }`}
            >
              {msg.text.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-mode-dropdown">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`chat-mode-buttons ${
            chatType === "귓속말" ? "whisper" : ""
          }`}
        >
          {chatType}
        </button>

        {isDropdownOpen && (
          <ul className="chat-mode-menu">
            <li
              className={`entire-mode ${
                chatType === "일반채팅" ? "selected" : ""
              }`}
              onClick={() => {
                setChatType("일반채팅");
                setIsDropdownOpen(false);
              }}
            >
              일반채팅
            </li>
            <li
              className={`whisper ${chatType === "귓속말" ? "selected" : ""}`}
              onClick={() => {
                setChatType("귓속말");
                setIsDropdownOpen(false);
              }}
            >
              귓속말
            </li>
          </ul>
        )}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.shiftKey) {
                return;
              } else {
                e.preventDefault();
                handleSendMessage();
              }
            }
          }}
          placeholder="채팅을 입력해주세요"
        />
        <button className="chat-send-btn" onClick={handleSendMessage}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.645 10.8461L5.89497 1.85736C5.66231 1.72843 5.39597 1.67323 5.13124 1.69909C4.8665 1.72494 4.61587 1.83061 4.41255 2.00212C4.20923 2.17362 4.06281 2.40285 3.99271 2.65944C3.9226 2.91602 3.93211 3.18786 4.01997 3.43892L6.90559 12.0002L4.01341 20.5624C3.94338 20.7603 3.92185 20.9721 3.95062 21.18C3.97939 21.388 4.05763 21.586 4.17876 21.7575C4.2999 21.929 4.4604 22.0689 4.64679 22.1655C4.83319 22.2621 5.04003 22.3125 5.24997 22.3127C5.47767 22.3122 5.70141 22.2531 5.89966 22.1411L21.6412 13.1345C21.8443 13.0204 22.0134 12.8543 22.1311 12.6532C22.2487 12.4521 22.3107 12.2233 22.3107 11.9903C22.3107 11.7573 22.2487 11.5286 22.1311 11.3275C22.0134 11.1264 21.8443 10.9602 21.6412 10.8461H21.645ZM21.0872 12.1586L5.34372 21.1624C5.3104 21.181 5.27217 21.1891 5.23415 21.1854C5.19613 21.1818 5.16013 21.1666 5.13098 21.1419C5.10182 21.1172 5.08089 21.0842 5.07099 21.0474C5.0611 21.0105 5.0627 20.9714 5.07559 20.9355C5.07597 20.9324 5.07597 20.9292 5.07559 20.9261L7.90309 12.5627H13.5C13.6492 12.5627 13.7922 12.5034 13.8977 12.3979C14.0032 12.2924 14.0625 12.1494 14.0625 12.0002C14.0625 11.851 14.0032 11.7079 13.8977 11.6024C13.7922 11.4969 13.6492 11.4377 13.5 11.4377H7.90309L5.07841 3.07517C5.07893 3.07207 5.07893 3.0689 5.07841 3.06579C5.06373 3.03002 5.06128 2.9904 5.07146 2.9531C5.08163 2.9158 5.10385 2.88291 5.13466 2.85954C5.16212 2.83327 5.19746 2.81674 5.23523 2.81251C5.273 2.80827 5.31112 2.81657 5.34372 2.83611L21.0937 11.8258C21.1228 11.8418 21.1469 11.8654 21.1635 11.8942C21.18 11.923 21.1883 11.9557 21.1875 11.9889C21.1876 12.0233 21.1784 12.057 21.1607 12.0864C21.143 12.1158 21.1175 12.1398 21.0872 12.1558V12.1586Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LobbyChatting;
