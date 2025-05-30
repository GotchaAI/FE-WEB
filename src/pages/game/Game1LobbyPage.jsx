import CheckBox from "commons/svgs/CheckBox";
import PageArrowButton from "commons/svgs/PageArrowButton";
import RoomTable from "components/game/Game1RoomTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "store/modal";
import { GAME1_LEVEL_OPTIONS, GAME1_ROOMS_PER_PAGE } from "constants/game";
import "styles/pages/game/Game1LobbyPage.scss";

// 임시 방목록 데이터
const dummyRooms = Array(21)
  .fill(null)
  .map((_, i) => ({
    isLocked: i % 2 === 0,
    mode: "AI를 속여라!",
    host: `호스트${i + 1}`,
    intro: "성인만/19/여기보통 뭐적지?/19시출",
    code: `#98${40 + i}`,
    players: `${1 + (i % 2)}/${2 + (i % 3)}`,
  }));

const Game1LobbyPage = () => {
  const [page, setPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const totalPages = Math.ceil(dummyRooms.length / GAME1_ROOMS_PER_PAGE);
  const currentRooms = dummyRooms.slice(
    (page - 1) * GAME1_ROOMS_PER_PAGE,
    page * GAME1_ROOMS_PER_PAGE
  );

  const handleSelectLevel = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  const handleQuickJoin = () => {
    // TODO: 자동 입장 로직
  };

  const handleCreateRoom = () => {
    navigate("/lobby/game1/create");
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
    if (room.isLocked) {
      // 비밀방일 경우 비밀번호 입력
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
    } else {
      // 공개방일 경우 바로 입장
      // 방이 가득 찼다면 토스트 메시지
      console.log(`[${room.intro}] 에 입장~`);
    }
  };

  return (
    <div className="game1-lobby-container">
      <div className="game1-filter-header">
        <span className="filter-title">로봇 성능</span>
        {GAME1_LEVEL_OPTIONS.map((level) => (
          <CheckBox
            key={level}
            label={level}
            checked={selectedLevel === level}
            onChange={() => handleSelectLevel(level)}
          />
        ))}
      </div>

      <div className="room-table-container">
        <RoomTable rooms={currentRooms} onClickRow={handleRoomClick} />
      </div>

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

export default Game1LobbyPage;
