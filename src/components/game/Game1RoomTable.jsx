import LockedIcon from "commons/svgs/LockedIcon";

const RoomTable = ({ rooms, onClickRow }) => {
  // 게임타입 → 한글 변환용
  const getModeName = (gameType) => {
    if (gameType === "TRICK_MYOMYO") return "AI를 속여라!";
    if (gameType === "LULU_ART_EXAM") return "루루의 미대입시";
    return gameType;
  };

  return (
    <table className="room-table">
      <thead>
        <tr>
          <th></th>
          <th>모드</th>
          <th>모집자</th>
          <th>소개말</th>
          <th>코드</th>
          <th>인원</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <tr key={index} onClick={() => onClickRow?.(room)}>
            <td>{room.hasPassword && <LockedIcon />}</td>
            <td>{getModeName(room.gameType)}</td>
            <td>{room.owner}</td>
            <td>{room.title}</td>
            <td>#{room.roomId}</td>
            <td>
              {room.currentUser}/{room.maxUser}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;
