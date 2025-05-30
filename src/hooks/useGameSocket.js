import { Client } from "@stomp/stompjs";
import { CONNECT_API, SOCKET_IP } from "constants/api";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { useGameSocketStore } from "store/socket";
import { getAuthToken } from "utils/token";

/**
 * useGameSocket 커스텀 훅
 *
 * 게임 웹소켓 서버에 연결
 * 서버에 접속 정보를 publish
 * 연결 실패 시 5000ms 간격으로 재연결 시도
 */

const useGameSocket = ({ userUuid }) => {
  const { setStompClient, clearStompClient } = useGameSocketStore();
  const { accessToken } = getAuthToken();
  const eventSubRef = useRef(null);

  useEffect(() => {
    if (!userUuid) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${SOCKET_IP}${CONNECT_API}`),
      connectHeaders: {
        Authorization: accessToken,
      },
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP 핸드쉐이킹", str),
    });

    client.onConnect = () => {
      console.log("Connected!");
      setStompClient(client);

      // 주요 에러 핸들러
      const subscription = client.subscribe(
        `/user/${userUuid}/queue/errors`,
        (message) => {
          console.log(
            "사용자별 에러 로그 :" + message + "상세 내용" + message.body
          );
        }
      );

      eventSubRef.current = subscription;
    };

    // stomp 에러 디버깅
    client.onStompError = (frame) => {
      console.log("STOMP 오류", frame);
    };

    // 웹소켓 연결
    client.activate();

    return () => {
      // 웹소켓 해제
      if (eventSubRef.current) {
        eventSubRef.current.unsubscribe();
      }
      client.deactivate();
      clearStompClient();
    };
  }, [accessToken, clearStompClient, setStompClient, userUuid]);

  return {};
};

export default useGameSocket;
