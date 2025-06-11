import { SOCKET_ROOM_LIST_EVENT } from "constants/api";
import { useCallback, useEffect, useState } from "react";
import { getRoomListAPI } from "services/lobby/lobby";
import { useGameSocketStore } from "store/socket";

export const useRoomList = (
  initialGameType = "TRICK_MYOMYO",
  initialDifficulty = "BASIC"
) => {
  const { stompClient, isConnected } = useGameSocketStore();
  const [roomList, setRoomList] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(initialDifficulty);

  const mapRoomData = useCallback(
    (data) => ({
      gameType: initialGameType,
      roomId: data.roomId?.toString(),
      difficulty: data.difficulty,
      title: data.title,
      owner: data.owner,
      hasPassword: data.hasPassword,
      maxUser: data.maxUser,
      currentUser: data.currentUser,
    }),
    [initialGameType]
  );

  const handleRoomEvent = useCallback(
    (payload) => {
      const { type, data } = payload;
      console.log("소켓 방 이벤트:", type, data);

      if (type === "CREATE") {
        setRoomList((prev) => [...prev, mapRoomData(data)]);
      } else if (type === "UPDATE") {
        setRoomList((prev) => {
          const updatedRoomId = data.roomId;
          const exists = prev.some((room) => room.roomId === updatedRoomId);

          // 없으면 걍 추가
          if (!exists) {
            return [...prev, mapRoomData(data)];
          }

          // 있는데 단이도가 바뀌면 삭제
          if (data.difficulty !== selectedLevel) {
            return prev.filter((room) => room.roomId !== updatedRoomId);
          }

          // 걍 방정보만 변경
          return prev.map((room) =>
            room.roomId === updatedRoomId ? mapRoomData(data) : room
          );
        });
      } else if (type === "DELETE") {
        setRoomList((prev) =>
          prev.filter((room) => room.roomId !== data.roomId?.toString())
        );
      }
    },
    [mapRoomData]
  );

  // ⭐ 소켓 구독
  useEffect(() => {
    if (!isConnected) return;

    console.log("✅ 방목록 소켓 구독 시작");

    const subscription = stompClient.subscribe(
      `/sub${SOCKET_ROOM_LIST_EVENT}`,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log("방목록 소켓 수신:", payload);
        handleRoomEvent(payload);
      }
    );

    return () => {
      console.log("🛑 방목록 소켓 구독 해제");
      subscription.unsubscribe();
    };
  }, [isConnected, stompClient, handleRoomEvent]);

  // ⭐ level 변경 시 자동 방목록 조회
  useEffect(() => {
    const fetchRooms = async () => {
      const params = { gameType: initialGameType, difficulty: selectedLevel };
      try {
        const response = await getRoomListAPI(params);
        setRoomList(
          response.map((room) => ({ ...room, gameType: initialGameType }))
        );
        console.log("초기 방목록 조회 성공:", response);
      } catch (error) {
        console.error("초기 방목록 조회 실패", error);
        setRoomList([]); // fallback
      }
    };

    fetchRooms();
  }, [initialGameType, selectedLevel]);

  return { roomList, selectedLevel, setSelectedLevel };
};
