import {
  SOCKET_LOBBY_CREATE_API,
  SOCKET_LOBBY_ERROR_API,
  SOCKET_LOBBY_JOIN_API,
  SOCKET_ROOM_LIST_EVENT,
} from "constants/api";
import { useEffect, useRef, useState } from "react";
import { useGameSocketStore } from "store/socket";

/**
 * useLobbySocket 커스텀 훅
 *
 * 로비에 필요한 pub 함수 및 구독 기능 제공
 */

const useLobbySocket = ({ userUuid, onLobbyError, onLobbyRoomEvent }) => {
  const roomEventSubRef = useRef(null);
  const { stompClient, isConnected } = useGameSocketStore();
  const [enterRoomId, setEnterRoomId] = useState(null);
  const [lobbyError, setLobbyError] = useState(null);

  // 🔕 공통 구독 해제 로직
  const unsubscribePrev = () => {
    if (roomEventSubRef.current) {
      roomEventSubRef.current.unsubscribe();
      roomEventSubRef.current = null;
      console.log("🔕 이전 구독 해제");
    }
  };

  // 초기 세팅
  useEffect(() => {
    if (!isConnected) return;

    // 🔔 로비 에러 구독
    const lobbyErrorSub = stompClient.subscribe(
      `${SOCKET_LOBBY_ERROR_API}/${userUuid}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("로비에러: ", payload);
        setLobbyError(payload)
        // setRoomError(payload);

        // if (onLobbyError) {
        //   onLobbyError(payload);
        // }
      }
    );

    // 🔔 방 목록 업데이트 구독
    const roomListUpdateSub = stompClient.subscribe(
      `/sub${SOCKET_ROOM_LIST_EVENT}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("방목록: ", payload);

        // ⭐ onLobbyRoomEvent 콜백 호출 (Game1LobbyPage에서 처리)
        if (onLobbyRoomEvent) {
          onLobbyRoomEvent(payload);
        }
      }
    );

    // 🔕 로비 이벤트 구독 해제
    return () => {
      lobbyErrorSub.unsubscribe();
      roomListUpdateSub.unsubscribe();
      unsubscribePrev();
    };
  }, [isConnected, stompClient, userUuid, onLobbyError, onLobbyRoomEvent]);

  // 방 생성
  const createRoom = (payload) => {
    if (!isConnected) return;
    unsubscribePrev();
    // 🔔 방 이벤트 구독
    const subscription = stompClient.subscribe(
      `/sub${SOCKET_LOBBY_CREATE_API}/${userUuid}`,
      (message) => {
        // 생성 가능 여부 반환
        const responsePayload = JSON.parse(message.body);
        const innerPayload = JSON.parse(responsePayload.payload);

        // 불가능(에러) 로직
        if (innerPayload && innerPayload.roomId) {
          setEnterRoomId(innerPayload.roomId);
        } else {
          console.log("방생성 실패 roomId 존재하지 않음!")
        }

        // 🔕 구독 해제
        unsubscribePrev();
      }
    );


    roomEventSubRef.current = subscription;
    // 🚀 방 생성 요청
    stompClient.publish({
      destination: `/pub${SOCKET_LOBBY_CREATE_API}`,
      body: JSON.stringify(payload),
    });
  };

  // 방 입장
  const enterRoom = (roomId, password) => {
    return new Promise((resolve) => {
      if (!isConnected) {
        resolve({ success: false });
        return;
      }

      unsubscribePrev();

      const subscription = stompClient.subscribe(
        `/sub${SOCKET_LOBBY_JOIN_API}/${userUuid}`,
        (message) => {
          const responsePayload = JSON.parse(message.body);
          console.log("방 입장 응답:", responsePayload);

          let innerPayload = {};
          try {
            innerPayload = JSON.parse(responsePayload.payload);
          } catch (error) {
            console.error("payload 파싱 실패!", error);
            resolve({ success: false });
            unsubscribePrev();
            return;
          }

          if (innerPayload.roomId) {
            console.log("방 입장 성공 → roomId:", innerPayload.roomId);
            setEnterRoomId(innerPayload.roomId);
            resolve({ success: true, roomId: innerPayload.roomId });
            unsubscribePrev();
            return;
          }

          console.error("방 입장 실패!");
          resolve({ success: false });
          unsubscribePrev();
        }
      );

      roomEventSubRef.current = subscription;

      // 방 입장 요청 (password 만 전송)
      stompClient.publish({
        destination: `/pub${SOCKET_LOBBY_JOIN_API}/${roomId}`,
        body: JSON.stringify({ password }),
      });
    });
  };



  return { createRoom, enterRoom, enterRoomId, lobbyError };
};

export default useLobbySocket;
