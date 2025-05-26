import CheckBox from "commons/svgs/CheckBox";
import PageArrowButton from "commons/svgs/PageArrowButton";
import { useState } from "react";
import "styles/pages/game/Game2LobbyPage.scss";

const dummyRooms = Array(6).fill({
  isLocked: true,
  mode: "AI를 속여라!",
  host: "엉덩이가좋아",
  intro: "성인만/19/여기보통 뭐적지?/19시출",
  code: "#9840",
  players: "1/2",
});

const Game2LobbyPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="game2-lobby-container">
      {/* 필터 영역 */}
      <div className="game2-filter-header">
        <span className="filter-title">로봇 성능</span>
        <CheckBox label="초보" checked={true} />
        <CheckBox label="고수" checked={true} />
        <CheckBox label="신" checked={true} />
      </div>

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
          {dummyRooms.map((room, index) => (
            <tr key={index}>
              <td>
                {room.isLocked && (
                  <span role="img" aria-label="lock">
                    🔒
                  </span>
                )}{" "}
              </td>
              <td>{room.mode}</td>
              <td>{room.host}</td>
              <td
                dangerouslySetInnerHTML={{
                  __html: room.intro.replace(/\/19/g, "<b>/19</b>"),
                }}
              />
              <td>{room.code}</td>
              <td>{room.players}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지 & 버튼 */}
      <div className="page-and-btn">
        <div className="pagination">
          <PageArrowButton
            direction="left"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          />

          <span>{page}</span>

          <PageArrowButton
            direction="right"
            disabled={page === 3}
            onClick={() => setPage((prev) => Math.min(prev + 1, 3))}
          />
        </div>
        <div className="room-actions">
          <button className="action-btn">빠른 입장</button>
          <button className="action-btn">방 만들기</button>
          <button className="action-btn">코드입력</button>
        </div>
      </div>
    </div>
  );
};

export default Game2LobbyPage;
