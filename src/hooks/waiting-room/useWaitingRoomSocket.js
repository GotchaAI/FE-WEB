import { SOCKET_ROOM_API, SOCKET_ROOM_ERROR_API } from "constants/api";
import { useEffect, useState } from "react";
import { useGameSocketStore } from "store/socket";

/**
 * useWaitingRoom 커스텀 훅
 *
 */

const roomExitEX = {
  eventType: "EXIT",
};

const gameStartEX = {
  eventType: "START",
};

const gameReadyEX = {
  eventType: "READY",
};

const gameUnreadyEX = {
  eventType: "UNREADY",
};

const useWaitingRoomSocket = ({ roomId, userUuid, setRoomInfo }) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const [isGameStart, setIsGameStart] = useState(false);
  const [initGameInfo, setInitGameInfo] = useState(null);

  useEffect(() => {
    if (roomId === null) return;
    if (!isConnected) return;
    console.log("방 입장 : " + roomId);

    const roomErrorSub = stompClient.subscribe(
      `${SOCKET_ROOM_ERROR_API}/${userUuid}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("방 에러:", payload);
      }
    );

    // 🔔 방 이벤트 여부 구독
    const subscription = stompClient.subscribe(
      `/sub${SOCKET_ROOM_API}/${roomId}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("방 이벤트:", payload);
        const eventType = payload.type;
        const data = payload.data;

        switch (eventType) {
          case "READY":
            console.log("READY");
            break;
          case "UNREADY":
            console.log("UNREADY");
            break;
          case "START":
            console.log("START");
            setIsGameStart(true);
            setInitGameInfo(data.gameData);
            break;
          case "UPDATE":
            console.log("UPDATE");
            setRoomInfo(data);
            break;
          default:
            break;
        }
      }
    );

    // 🔕 대기방 이벤트 구독 해제
    return () => {
      roomErrorSub.unsubscribe();
      subscription.unsubscribe();
    };
  }, [stompClient, roomId, setRoomInfo, isConnected, userUuid]);

  // 게임 시작
  const startGame = (roomId) => {
    if (!stompClient?.connected) return;

    // 🚀 게임 시작 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(gameStartEX),
    });
  };

  // 게임 준비
  const readyGame = (roomId) => {
    if (!stompClient?.connected) return;

    // 🚀 게임 준비 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(gameReadyEX),
    });
  };

  // 게임 준비 취소
  const unreadyGame = (roomId) => {
    if (!stompClient?.connected) return;

    // 🚀 게임 준비 취소 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(gameUnreadyEX),
    });
  };

  // 게임 상태 변경
  const updateRoomInfo = (roomId, updateRoomDTO) => {
    if (!stompClient?.connected) return;

    // body
    const roomUpdateEX = {
      eventType: "UPDATE",
      content: JSON.stringify(updateRoomDTO),
    };

    // 🚀 게임 준비 취소 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(roomUpdateEX),
    });
  };

  // 방 퇴장
  const quitRoom = (roomId) => {
    if (!stompClient?.connected) return;

    // 🚀 방 퇴장 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(roomExitEX),
    });
  };

  return {
    startGame,
    readyGame,
    unreadyGame,
    updateRoomInfo,
    quitRoom,
    isGameStart,
    initGameInfo,
  };
};

export default useWaitingRoomSocket;
