import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAuthToken } from "utils/token";
import { SOCKET_IP, SOCKET_CONNECT_API } from "constants/api";
import { useChatSocketStore } from "store/socket";

const useChatSocket = (myUuid) => {
  const { setStompClient, clearStompClient, setIsConnected } =
    useChatSocketStore();
  const clientRef = useRef(null);
  const subRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [sendTimestamps, setSendTimestamps] = useState([]);

  useEffect(() => {
    if (!myUuid) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${SOCKET_IP}${SOCKET_CONNECT_API}`),
      connectHeaders: {
        Authorization: getAuthToken().accessToken,
      },
      reconnectDelay: 5000,
      debug: (str) => console.log("채팅 소켓 DEBUG:", str),
    });

    client.onConnect = () => {
      console.log("채팅 WebSocket 연결됨");
      clientRef.current = client;
      setStompClient(client);
      setIsConnected(true);

      const subscription = client.subscribe("/sub/chat/all", (message) => {
        const body = JSON.parse(message.body);

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

      subRef.current = subscription;
    };

    client.onStompError = async (frame) => {
      console.error(" STOMP(채팅) 오류", frame);

      if (frame.body.includes("JWT-401-001")) {
        console.warn(" 액세스 토큰 만료됨. 리프레시 토큰으로 재발급 시도");
        const newToken = await getAuthToken(); // 네 구현에 맞게 작성
        client.connectHeaders.Authorization = newToken;
        client.activate(); // 재시도
      }
    };

    client.onWebSocketClose = () => {
      console.warn(" 채팅 연결 종료");
      setIsConnected(false);
    };

    client.activate();

    return () => {
      if (subRef.current) subRef.current.unsubscribe();
      if (clientRef.current) clientRef.current.deactivate();
      clearStompClient();
      setIsConnected(false);
    };
  }, [myUuid, setStompClient, clearStompClient, setIsConnected]);
  const sendMessage = (text, receiverUuid = null) => {
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

    if (receiverUuid) {
      payload.receiverUuid = receiverUuid;
    }

    // 서버 전송(setMessages는 에코로 오는 메시지로 적용해줄거임)
    clientRef.current?.publish({
      destination: receiverUuid ? "/pub/chat/private" : "/pub/chat/all",
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
