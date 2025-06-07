import { useState, useCallback } from "react";

export const useRoomList = (initialGameType = "TRICK_MYOMYO") => {
  const [roomList, setRoomList] = useState([]);

  // 방목록 가져오기
  const mapRoomData = useCallback((data) => ({
    gameType: initialGameType,
    roomId: data.roomId?.toString(),
    title: data.title,
    owner: data.owner,
    hasPassword: data.hasPassword,
    maxUser: data.maxUser,
    currentUser: data.currentUser,
  }), [initialGameType]);

  // 방목록 변화 감지
  const handleRoomEvent = useCallback((payload) => {
    const { type, data } = payload;
    console.log("소켓 방 이벤트:", type, data);

    // 생성시 목록에 추가
    if (type === "CREATE") {
      setRoomList((prev) => [...prev, mapRoomData(data)]);
    } else if (type === "UPDATE") { // 수정사항 발견시 목록에 반영
      setRoomList((prev) =>
        prev.map((room) =>
          room.roomId === data.roomId?.toString() ? mapRoomData(data) : room
        )
      );
    } else if (type === "DELETE") { // 삭제시 목록에서 삭제
      setRoomList((prev) =>
        prev.filter((room) => room.roomId !== data.roomId?.toString())
      );
    }
  }, [mapRoomData]);

  return { roomList, setRoomList, handleRoomEvent };
};
