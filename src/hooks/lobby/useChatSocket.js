import { useEffect, useRef, useState } from "react";
import { useGameSocketStore } from "store/socket";

const useChatSocket = ({ userUuid }) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const clientRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [sendTimestamps, setSendTimestamps] = useState([]);

  useEffect(() => {
    if (!isConnected || !userUuid) return;

    console.log("채팅 WebSocket 연결됨");

    const chatGlobalSub = stompClient.subscribe("/sub/chat/all", (message) => {
      const body = JSON.parse(message.body);
      console.log(body);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + "_" + Math.random().toString(36).substring(2),
          sender: body.nickname,
          text: body.content,
          type: body.chatType === "PRIVATE" ? "귓속말" : "일반채팅",
        },
      ]);
    });

    return () => {
      chatGlobalSub.unsubscribe();
      if (clientRef.current) clientRef.unsubscribe();
    };
  }, [stompClient, isConnected]);

  const sendMessage = (text, receiverNickname = null) => {
    if (!isConnected) return;

    const now = Date.now();
    const recent = sendTimestamps.filter((t) => now - t < 10000);

    if (recent.length >= 5) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 10000);
      return false;
    }

    const payload = {
      content: text,
    };

    if (receiverNickname) {
      payload.receiverNickname = receiverNickname;
    }

    // 서버 전송(setMessages는 에코로 오는 메시지로 적용해줄거임)
    stompClient.publish({
      destination: receiverNickname ? "/pub/chat/private" : "/pub/chat/all",
      body: JSON.stringify(payload),
    });

    setSendTimestamps([...recent, now]);
    return true;
  };

  return {
    messages,
    sendMessage,
    isRateLimited,
    setIsRateLimited,
  };
};

export default useChatSocket;
