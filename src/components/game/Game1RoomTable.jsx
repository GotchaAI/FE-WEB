import LockedIcon from "commons/svgs/LockedIcon";
const RoomTable = ({ rooms, onClickRow }) => {
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
          <tr
            key={index}
            onClick={() => onClickRow?.(room)}
            style={{ cursor: "pointer" }}
          >
            <td>{room.isLocked && <LockedIcon />}</td>
            <td>{room.mode}</td>
            <td>{room.host}</td>
            <td>{room.intro}</td>
            <td>{room.code}</td>
            <td>{room.players}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTable;
