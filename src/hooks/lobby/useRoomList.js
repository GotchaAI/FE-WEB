import { useState, useCallback } from "react";

export const useRoomList = (initialGameType = "TRICK_MYOMYO") => {
  const [roomList, setRoomList] = useState([]);

  const mapRoomData = useCallback((data) => ({
    gameType: initialGameType,
    roomId: data.roomId?.toString(), // 안전하게 string
    title: data.title,
    owner: data.owner,
    hasPassword: data.hasPassword,
    maxUser: data.maxUser,
    currentUser: data.currentUser,
  }), [initialGameType]);

  const handleRoomEvent = useCallback((payload) => {
    const { type, data } = payload;
    console.log("소켓 방 이벤트:", type, data);

    if (type === "CREATE") {
      setRoomList((prev) => [...prev, mapRoomData(data)]);
    } else if (type === "UPDATE") {
      setRoomList((prev) =>
        prev.map((room) =>
          room.roomId === data.roomId?.toString() ? mapRoomData(data) : room
        )
      );
    } else if (type === "DELETE") {
      setRoomList((prev) =>
        prev.filter((room) => room.roomId !== data.roomId?.toString())
      );
    }
  }, [mapRoomData]);

  return { roomList, setRoomList, handleRoomEvent };
};
