import { SOCKET_ROOM_API, SOCKET_ROOM_ERROR_API } from "constants/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
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
            setRoomInfo((prev) => ({
              ...prev,
              userInfos: prev.userInfos.map((user) =>
                user.userUuid === data ? { ...user, ready: true } : user
              ),
            }));
            break;
          case "UNREADY":
            console.log("UNREADY");
            setRoomInfo((prev) => ({
              ...prev,
              userInfos: prev.userInfos.map((user) =>
                user.userUuid === data ? { ...user, ready: false } : user
              ),
            }));
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
          case "JOIN":
            console.log("JOIN");
            setRoomInfo((prev) => ({
              ...prev,
              userInfos: data,
            }));
            break;
          case "EXIT":
            console.log("EXIT");
            setRoomInfo((prev) => ({
              ...prev,
              userInfos: prev.userInfos.filter((user) => user.userUuid != data),
            }));
            break;
          case "KICK":
            console.log("KICK");
            if (data == userUuid) navigate("/lobby");
            setRoomInfo((prev) => ({
              ...prev,
              userInfos: prev.userInfos.filter((user) => user.userUuid != data),
            }));
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

  // 방장 위임
  const ownerChange = (data) => {
    if (!stompClient?.connected) return;

    // 🚀 방 퇴장 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(data),
    });
  };

  // 방 강퇴
  const kickPlayer = (data) => {
    if (!stompClient?.connected) return;

    // 🚀 방 퇴장 publish
    stompClient.publish({
      destination: `/pub${SOCKET_ROOM_API}/${roomId}`,
      body: JSON.stringify(data),
    });
  };

  return {
    startGame,
    readyGame,
    unreadyGame,
    updateRoomInfo,
    quitRoom,
    ownerChange,
    kickPlayer,
    isGameStart,
    initGameInfo,
  };
};

export default useWaitingRoomSocket;
