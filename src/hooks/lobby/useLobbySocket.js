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

// TODO: 로비 세부 로직 추가 예정
const roomCreateEX = {
  title: "ㅎㅇㅎㅇG",
  maxUser: 2,
  hasPassword: true,
  password: "1234",
  difficulty: "BASIC",
  gameType: "TRICK_MYOMYO",
  roundCount: 3,
};

const roomEnterEX = {
  password: "1234",
};

const useLobbySocket = ({ userUuid }) => {
  const roomEventSubRef = useRef(null);
  const { stompClient, isConnected } = useGameSocketStore();
  const [enterRoomId, setEnterRoomId] = useState(null);

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
        console.log(payload);
      }
    );

    // 🔔 방 목록 업데이트 구독
    const roomListUpdateSub = stompClient.subscribe(
      `/sub${SOCKET_ROOM_LIST_EVENT}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log(payload);
      }
    );

    // 🔕 로비 이벤트 구독 해제
    return () => {
      lobbyErrorSub.unsubscribe();
      roomListUpdateSub.unsubscribe();
      unsubscribePrev();
    };
  }, [isConnected, stompClient, userUuid]);

  // 방 생성
  const createRoom = () => {
    if (!isConnected) return;

    unsubscribePrev();

    // 🔔 방 이벤트 구독
    // TODO: 방 구독 로직 변경 예정 -> OK:roodID 반환 FAIL:??
    const subscription = stompClient.subscribe(
      `/sub${SOCKET_LOBBY_CREATE_API}/${userUuid}`,
      (message) => {
        // 생성 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        const roomId = JSON.parse(roomInfo.payload);

        // TODO: 불가능(에러) 로직

        // 입장 가능
        setEnterRoomId(roomId.roomId);

        // 🔕 구독 해제
        unsubscribePrev();
      }
    );

    roomEventSubRef.current = subscription;

    // 🚀 방 생성 요청
    stompClient.publish({
      destination: `/pub${SOCKET_LOBBY_CREATE_API}`,
      body: JSON.stringify(roomCreateEX),
    });
  };

  // 방 입장
  const enterRoom = (selectedRoomId) => {
    if (!isConnected) return;

    unsubscribePrev();

    // 🔔 방 입장 가능 여부 구독
    // TODO: 방 입장 구독 로직 변경 예정 -> OK:roodID 반환 FAIL:??
    const subscription = stompClient.subscribe(
      `/sub${SOCKET_LOBBY_JOIN_API}/${userUuid}`,
      (message) => {
        // 입장 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        console.log("입장 가능? :", roomInfo);

        // TODO: 불가능 로직(에러) 처리

        // 입장 가능
        setEnterRoomId(selectedRoomId); // 상태 업데이트

        // 🔕 구독 해제
        unsubscribePrev();
      }
    );

    roomEventSubRef.current = subscription;

    // 🚀 방 입장 publish
    stompClient.publish({
      destination: `/pub${SOCKET_LOBBY_JOIN_API}/${selectedRoomId}`,
      body: JSON.stringify(roomEnterEX),
    });
  };

  return { createRoom, enterRoom, enterRoomId };
};

export default useLobbySocket;
