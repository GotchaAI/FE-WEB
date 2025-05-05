import React, { useState, useRef, useEffect } from "react";
import chattingLob from "assets/chattingLob.png";
import "styles/components/lobby/LobbyChatting.scss"; // CSS 파일을 import합니다.
const LobbyChatting = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const chatWindowRef = useRef(null);

  const myNickname = "me"; // 본인의 닉네임 (혹은 유저 아이디)
  // 현재 서버에서 채팅기능이 미완이라 테스팅 코드 작성
  useEffect(() => {
    const interval = setInterval(() => {
      // 랜덤 닉네임과 메시지
      const randomUsers = ["Alice", "Bob", "Charlie"];
      const sampleTexts = [
        "안녕하세요!",
        "뭐하고 계세요?",
        "좋은 하루 되세요~",
        "테스트 메시지입니다.",
      ];

      const sender =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

      setMessages((prev) => [...prev, { sender, text }]);
    }, 5000); // 5초마다 메시지 추가

    return () => clearInterval(interval); // 언마운트 시 정리
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: myNickname, text: input }]);
      setInput("");
    }
  };
  const handleScroll = () => {
    const el = chatWindowRef.current;
    if (!el) return;
    const threshold = 50;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  };

  useEffect(() => {
    if (isAtBottom && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  return (
    <div
      className="lobby-chatting-container"
      style={{
        backgroundImage: `url(${chattingLob})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "204px",
        height: "460px",
      }}
    >
      <div className="chat-window" ref={chatWindowRef} onScroll={handleScroll}>
        <div className="chat-header">@하면 귓말임</div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === myNickname ? "mine" : "theirs"
            }`}
          >
            {msg.sender !== myNickname && (
              <div className="chat-nickname">{msg.sender}</div>
            )}
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
export default LobbyChatting;
