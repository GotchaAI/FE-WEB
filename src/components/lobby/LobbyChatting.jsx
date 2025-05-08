import React, { useState, useRef, useEffect } from "react";
import chattingLob from "assets/chattingLob.png";
import "styles/components/lobby/LobbyChatting.scss";
import SendButton from "commons/svgs/SendButton";

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
          <SendButton />
        </button>
      </div>
    </div>
  );
};

export default LobbyChatting;
