import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_IP, SOCKET_CONNECT_API } from "constants/api";
import { getAuthToken } from "utils/token";
import { getFreindsListAPI } from "services/friend/friend";

const useFriendSocket = (userUuid) => {
  const clientRef = useRef(null);
  const subRef = useRef(null);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const list = await getFreindsListAPI();
        setFriendList(list);

        console.log(friendList);
      } catch (error) {
        console.error("친구 목록 불러오기 실패:", error);
      }
    };

    fetchFriendList();
  }, [friendList]);
  useEffect(() => {
    if (!userUuid) return;

    const { accessToken } = getAuthToken();

    const client = new Client({
      webSocketFactory: () => new SockJS(`${SOCKET_IP}${SOCKET_CONNECT_API}`),
      connectHeaders: {
        Authorization: accessToken,
      },
      reconnectDelay: 5000,
      debug: (str) => console.log(" [친구 소켓 DEBUG]", str),
    });

    client.onConnect = () => {
      console.log("친구 WebSocket 연결됨");

      const subscription = client.subscribe(
        `/sub/friend/${userUuid}`,
        (message) => {
          const { eventType, data } = JSON.parse(message.body);

          setFriendList((prev) => {
            switch (eventType) {
              case "ONLINE":
                return prev.map((f) =>
                  f.uuid === data ? { ...f, online: true } : f
                );
              case "DELETE":
                return prev.filter((f) => f.uuid !== data);
              case "REQUEST":
              case "REJECT":
              case "ACCEPT":
                return [...prev.filter((f) => f.uuid !== data.uuid), data];
              default:
                return prev;
            }
          });
        }
      );

      clientRef.current = client;
      subRef.current = subscription;
    };

    client.onWebSocketClose = () => {
      console.warn("친구 소켓 연결 종료");
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류", frame);
    };

    client.activate();

    return () => {
      if (subRef.current) subRef.current.unsubscribe();
      if (clientRef.current) clientRef.current.deactivate();
    };
  }, [userUuid]);

  return { friendList };
};

export default useFriendSocket;
