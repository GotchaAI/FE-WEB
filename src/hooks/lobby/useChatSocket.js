import { SOCKET_CHAT_PRIVATE, SOCKET_CHAT_ALL } from "constants/api";
import { useEffect, useRef, useState } from "react";
import { useGameSocketStore } from "store/socket";
import { getUserName } from "utils/user";

const useChatSocket = ({ userUuid }) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const clientRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [sendTimestamps, setSendTimestamps] = useState([]);

  const myName = getUserName();
  useEffect(() => {
    if (!isConnected || !userUuid) return;

    console.log("채팅 WebSocket 연결됨");

    const chatGlobalSub = stompClient.subscribe(
      `/sub${SOCKET_CHAT_ALL}`,
      (message) => {
        const body = JSON.parse(message.body);
        console.log(body);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + "_" + Math.random().toString(36).substring(2),
            sender: body.nickname,
            text: body.content,
            type: "일반채팅",
          },
        ]);
      }
    );
    const chatPrivateSub = stompClient.subscribe(
      `/sub${SOCKET_CHAT_PRIVATE}/${userUuid}`,
      (message) => {
        const body = JSON.parse(message.body);
        console.log(body);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + "_" + Math.random().toString(36).substring(2),
            sender: body.nickname,
            text: body.content,
            type: "귓속말",
          },
        ]);
      }
    );
    return () => {
      chatGlobalSub.unsubscribe();
      chatPrivateSub.unsubscribe();
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
      //사용자가 상대방 private 수신채널에 없어서 에코로는 올 수가 없음-> 그래서 자체 추가
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + "_" + Math.random().toString(36).substring(2),
          sender: myName,
          text: text,
          type: "귓속말",
        },
      ]);
    }

    // 서버 전송(setMessages는 에코로 오는 메시지로 적용해줄거임)
    stompClient.publish({
      destination: receiverNickname
        ? `/pub${SOCKET_CHAT_PRIVATE}`
        : `/pub${SOCKET_CHAT_ALL}`,
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
