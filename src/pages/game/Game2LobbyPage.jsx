import CheckBox from "commons/svgs/CheckBox";
import PageArrowButton from "commons/svgs/PageArrowButton";
import RoomTable from "components/game/Game2RoomTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "store/modal";
import "styles/pages/game/Game2LobbyPage.scss";

// 임시 방목록 데이터
const dummyRooms = Array(24)
  .fill(null)
  .map((_, i) => ({
    isLocked: i % 2 === 0,
    mode: "AI를 속여라!",
    host: `호스트${i + 1}`,
    intro: "성인만/19/여기보통 뭐적지?/19시출",
    code: `#98${40 + i}`,
    players: `${1 + (i % 2)}/${2 + (i % 3)}`,
  }));

const ROOMS_PER_PAGE = 6;

const Game2LobbyPage = () => {
  const [page, setPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const totalPages = Math.ceil(dummyRooms.length / ROOMS_PER_PAGE);
  const currentRooms = dummyRooms.slice(
    (page - 1) * ROOMS_PER_PAGE,
    page * ROOMS_PER_PAGE
  );

  const handleSelectLevel = (level) => {
    if (selectedLevel === level) {
      setSelectedLevel(null); // 다시 클릭하면 해제
    } else {
      setSelectedLevel(level);
    }
  };

  const handleQuickJoin = () => {
    // TODO: 자동 입장 로직
  };

  const handleCreateRoom = () => {
    navigate("/lobby/game2/create");
  };

  const handleEnterCode = () => {
    useModalStore.getState().openModal(
      "codeInput",
      {
        title: "코드 입력",
      },
      (code) => {
        console.log("입력된 코드:", code);
      }
    );
  };

  const handleRoomClick = (room) => {
    useModalStore.getState().openModal(
      "roomEnter",
      {
        roomType: room.mode,
        hostName: room.host,
        roomName: room.intro,
      },
      (password) => {
        console.log("입력한 비밀번호:", password);
      }
    );
  };

  return (
    <div className="game2-lobby-container">
      <div className="game2-filter-header">
        <span className="filter-title">로봇 성능</span>
        {["초보", "고수", "신"].map((level) => (
          <CheckBox
            key={level}
            label={level}
            checked={selectedLevel === level}
            onChange={() => handleSelectLevel(level)}
          />
        ))}
      </div>

      <RoomTable rooms={currentRooms} onClickRow={handleRoomClick} />

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
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </div>
        <div className="room-actions">
          <button className="action-btn" onClick={handleQuickJoin}>
            빠른 입장
          </button>
          <button className="action-btn" onClick={handleCreateRoom}>
            방 만들기
          </button>
          <button className="action-btn" onClick={handleEnterCode}>
            코드입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game2LobbyPage;
