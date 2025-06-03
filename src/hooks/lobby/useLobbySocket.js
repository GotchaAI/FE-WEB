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
// const roomCreateEX = {
//   title: "ㅎㅇㅎㅇG",
//   maxUser: 2,
//   hasPassword: true,
//   password: "1234",
//   difficulty: "BASIC",
//   gameType: "TRICK_MYOMYO",
//   roundCount: 3,
// };

const roomEnterEX = {
  eventType: "JOIN",
  content: "1234",
};

const useLobbySocket = ({ userUuid, onLobbyError }) => {
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
        console.log("로비에러: ", payload);

        if (onLobbyError) {
          onLobbyError(payload);
        }
      }
    );

    // 🔔 방 목록 업데이트 구독
    const roomListUpdateSub = stompClient.subscribe(
      `/sub${SOCKET_ROOM_LIST_EVENT}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("방목록: ", payload);
      }
    );

    // 🔕 로비 이벤트 구독 해제
    return () => {
      lobbyErrorSub.unsubscribe();
      roomListUpdateSub.unsubscribe();
      unsubscribePrev();
    };
  }, [isConnected, stompClient, userUuid, onLobbyError]);

  // 방 생성
  const createRoom = (roomPayload) => {
    return new Promise((resolve) => {
      // 소켓이 연결 안되어 있다면 실패 처리
      if (!isConnected) {
        resolve({ success: false });
        return;
      }

      try {
        // 이전 구독 해제
        unsubscribePrev();
        console.log(roomPayload);

        // 방 생성 응답 구독
        const subscription = stompClient.subscribe(
          `/sub${SOCKET_LOBBY_CREATE_API}/${userUuid}`,
          (message) => {
            // 외부 payload 파싱
            const outerPayload = JSON.parse(message.body);
            console.log("방 생성 성공 응답:", outerPayload);

            let innerPayload = {};
            try {
              // 내부 payload (roomId 포함) 파싱
              innerPayload = JSON.parse(outerPayload.payload);
            } catch (error) {
              console.error("payload 파싱 실패!", error);
              // 파싱 실패시 구독 해제 및 실패 처리
              resolve({ success: false });
              unsubscribePrev();
              return;
            }

            // roomId가 있으면 방 생성 성공
            if (innerPayload.roomId) {
              console.log("방 생성 성공 → roomId:", innerPayload.roomId);
              setEnterRoomId(innerPayload.roomId);
              // 성공 시 roomId 포함 반환
              resolve({ success: true, roomId: innerPayload.roomId });
              unsubscribePrev();
              return;
            }

            // roomId가 없으면 방 생성 실패
            console.error("방 생성 실패!", outerPayload.message || "알 수 없는 이유");
            resolve({ success: false });
            unsubscribePrev();
          }
        );

        // 구독 참조 저장
        roomEventSubRef.current = subscription;

        // 방 생성 요청 전송
        stompClient.publish({
          destination: `/pub${SOCKET_LOBBY_CREATE_API}`,
          body: JSON.stringify(roomPayload),
        });
      } catch (error) {
        // 그 외의 예외 발생 실패 처리
        console.error("예외 발생:", error);
        resolve({ success: false });
      }
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
            console.error("🚫 payload 파싱 실패!", error);
            resolve({ success: false });
            unsubscribePrev();
            return;
          }

          if (innerPayload.roomId) {
            console.log("✅ 방 입장 성공 → roomId:", innerPayload.roomId);
            setEnterRoomId(innerPayload.roomId);
            resolve({ success: true, roomId: innerPayload.roomId });
            unsubscribePrev();
            return;
          }

          console.error("🚫 방 입장 실패!");
          resolve({ success: false });
          unsubscribePrev();
        }
      );

      roomEventSubRef.current = subscription;

      // 🚀 방 입장 요청 (password 만 전송)
      stompClient.publish({
        destination: `/pub${SOCKET_LOBBY_JOIN_API}/${roomId}`,
        body: JSON.stringify({ password }),
      });
    });
  };



  return { createRoom, enterRoom, enterRoomId };
};

export default useLobbySocket;
