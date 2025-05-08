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
    <div className="lobby-chatting-container">
      <img src={chattingLob} className="lobby-chatting-background"></img>
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

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-send-btn" onClick={handleSendMessage}>
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.645 9.84611L2.89497 0.857356C2.66231 0.728429 2.39597 0.673234 2.13124 0.699086C1.8665 0.724937 1.61587 0.830615 1.41255 1.00212C1.20923 1.17362 1.06281 1.40285 0.992706 1.65944C0.922598 1.91602 0.932106 2.18786 1.01997 2.43892L3.90559 11.0002L1.01341 19.5624C0.943377 19.7603 0.921845 19.9721 0.950618 20.18C0.979391 20.388 1.05763 20.586 1.17876 20.7575C1.2999 20.929 1.4604 21.0689 1.64679 21.1655C1.83319 21.2621 2.04003 21.3125 2.24997 21.3127C2.47767 21.3122 2.70141 21.2531 2.89966 21.1411L18.6412 12.1345C18.8443 12.0204 19.0134 11.8543 19.1311 11.6532C19.2487 11.4521 19.3107 11.2233 19.3107 10.9903C19.3107 10.7573 19.2487 10.5286 19.1311 10.3275C19.0134 10.1264 18.8443 9.96024 18.6412 9.84611H18.645ZM18.0872 11.1586L2.34372 20.1624C2.3104 20.181 2.27217 20.1891 2.23415 20.1854C2.19613 20.1818 2.16013 20.1666 2.13098 20.1419C2.10182 20.1172 2.08089 20.0842 2.07099 20.0474C2.0611 20.0105 2.0627 19.9714 2.07559 19.9355C2.07597 19.9324 2.07597 19.9292 2.07559 19.9261L4.90309 11.5627H10.5C10.6492 11.5627 10.7922 11.5034 10.8977 11.3979C11.0032 11.2924 11.0625 11.1494 11.0625 11.0002C11.0625 10.851 11.0032 10.7079 10.8977 10.6024C10.7922 10.4969 10.6492 10.4377 10.5 10.4377H4.90309L2.07841 2.07517C2.07893 2.07207 2.07893 2.0689 2.07841 2.06579C2.06373 2.03002 2.06128 1.9904 2.07146 1.9531C2.08163 1.9158 2.10385 1.88291 2.13466 1.85954C2.16212 1.83327 2.19746 1.81674 2.23523 1.81251C2.273 1.80827 2.31112 1.81657 2.34372 1.83611L18.0937 10.8258C18.1228 10.8418 18.1469 10.8654 18.1635 10.8942C18.18 10.923 18.1883 10.9557 18.1875 10.9889C18.1876 11.0233 18.1784 11.057 18.1607 11.0864C18.143 11.1158 18.1175 11.1398 18.0872 11.1558V11.1586Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default LobbyChatting;
