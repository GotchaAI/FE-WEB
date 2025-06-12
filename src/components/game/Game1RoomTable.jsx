import LockedIcon from "commons/svgs/LockedIcon";
import { EmptyContent } from "commons/emptyContent/EmptyContent";

const RoomTable = ({ rooms, onClickRow }) => {
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
          <th>방제목</th>
          <th>코드</th>
          <th>인원</th>
        </tr>
      </thead>
      <tbody>
        {rooms.length === 0 ? (
          <tr className="empty-row">
            <td colSpan={6} className="empty-room-cell">
              <EmptyContent />
            </td>
          </tr>
        ) : (
          rooms.map((room) => (
            <tr key={room.roomId} onClick={() => onClickRow?.(room)}>
              <td>{room.hasPassword && <LockedIcon />}</td>
              <td>{getModeName(room.gameType)}</td>
              <td>{room.owner}</td>
              <td>
                {room.title.length > 24
                  ? `${room.title.slice(0, 24)}`
                  : room.title}
              </td>
              <td>#{room.roomId}</td>
              <td>
                {room.currentUser}/{room.maxUser}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default RoomTable;
