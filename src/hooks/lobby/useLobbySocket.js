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
  eventType: "JOIN",
  content: "1234",
};

const useLobbySocket = ({ userUuid }) => {
  const roomEventSubRef = useRef(null);
  const { stompClient } = useGameSocketStore();
  const [enterRoomInfo, setEnterRoomInfo] = useState(null);

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
    if (!stompClient || !stompClient.connected) return;

    // 🔔 로비 에러 구독
    const subscription = stompClient.subscribe(
      `/sub/room/list/event`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log(payload);
      }
    );

    // 🔕 로비 이벤트 구독 해제
    return () => {
      subscription.unsubscribe();
      unsubscribePrev();
    };
  }, [stompClient]);

  // 방 생성
  const createRoom = () => {
    if (!stompClient || !stompClient.connected) return;

    unsubscribePrev();

    // 🔔 방 이벤트 구독
    // TODO: 방 구독 로직 변경 예정 -> OK:roodID 반환 FAIL:??
    const subscription = stompClient.subscribe(
      `/sub/room/create/${userUuid}`,
      (message) => {
        // 생성 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        console.log("방 번호:", roomInfo);

        // TODO: 불가능(에러) 로직

        // 입장 가능
        setEnterRoomInfo(roomInfo);

        // 🔕 구독 해제
        unsubscribePrev();
      }
    );

    roomEventSubRef.current = subscription;

    // 🚀 방 생성 요청
    stompClient.publish({
      destination: "/pub/room/create",
      body: JSON.stringify(roomCreateEX),
    });
  };

  // 방 입장
  const enterRoom = (selectedRoomId) => {
    if (!stompClient?.connected) return;

    unsubscribePrev();

    // 🔔 방 입장 가능 여부 구독
    // TODO: 방 입장 구독 로직 변경 예정 -> OK:roodID 반환 FAIL:??
    const subscription = stompClient.subscribe(
      `/sub/room/event/${selectedRoomId}`,
      (message) => {
        // 입장 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        console.log("입장 가능? :", roomInfo);

        // TODO: 불가능 로직(에러) 처리

        // 입장 가능
        setEnterRoomInfo(selectedRoomId); // 상태 업데이트

        // 🔕 구독 해제
        unsubscribePrev();
      }
    );

    roomEventSubRef.current = subscription;

    // 🚀 방 입장 publish
    stompClient.publish({
      destination: `/pub/room/${selectedRoomId}`,
      body: JSON.stringify(roomEnterEX),
    });
  };

  return { createRoom, enterRoom, enterRoomInfo };
};

export default useLobbySocket;
