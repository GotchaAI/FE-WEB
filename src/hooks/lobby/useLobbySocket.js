import { useEffect, useRef, useState } from "react";
import { useGameSocketStore } from "store/socket";

/**
 * useGameSocket 커스텀 훅
 *
 * 게임 웹소켓 서버에 연결
 * nickName과 roomId를 기반으로 초기 연결을 수행
 * 서버에 접속 정보를 publish
 * 연결 실패 시 5000ms 간격으로 재연결 시도
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

const userUuid = 5; // TODO: uuid 저장 기능 추가 후 적용

const useLobbySocket = () => {
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

  useEffect(() => {
    if (!stompClient || !stompClient.connected) return;

    // 🔔 로비 에러 구독
    const subscription = stompClient.subscribe(
      `/sub/room/list/event`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log(JSON.parse(payload));
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
    const subscription = stompClient.subscribe(
      `/sub/room/create/${userUuid}`,
      (message) => {
        // 생성 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        console.log("방 번호:", roomInfo);

        // TODO: 불가능(에러) 로직

        // 입장 가능
        setEnterRoomInfo(roomInfo);
        subscription.unsubscribe();
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
    const subscription = stompClient.subscribe(
      `/sub/room/event/${selectedRoomId}`,
      (message) => {
        // 입장 가능 여부 반환
        const roomInfo = JSON.parse(message.body);
        console.log("입장 가능? :", roomInfo);

        // TODO: 불가능 로직(에러) 처리

        // 입장 가능
        setEnterRoomInfo(roomInfo); // 상태 업데이트

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
