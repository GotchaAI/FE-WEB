import CheckBox from "commons/svgs/CheckBox";
import PageArrowButton from "commons/svgs/PageArrowButton";
import RoomTable from "components/game/Game1RoomTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME1_LEVEL_OPTIONS, GAME1_ROOMS_PER_PAGE } from "constants/game";
import "styles/pages/game/Game1LobbyPage.scss";
import useLobbySocket from "hooks/lobby/useLobbySocket";
import { getUserUuid } from "utils/user";
import { useToastStore } from "store/toast";
import { useRoomList } from "hooks/lobby/useRoomList";
import {
  ROOM_IS_FULL,
  ROOM_NOT_EXIST,
  ROOM_PASSWORD_NOT_MATCHED,
} from "constants/errorCode";
import { useRoomActions } from "hooks/lobby/useRoomActions";

const Game1LobbyPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const userUuid = getUserUuid();

  const { roomList, selectedLevel, setSelectedLevel } =
    useRoomList("TRICK_MYOMYO");

  const { enterRoom, enterRoomId, lobbyError } = useLobbySocket({ userUuid });

  const {
    handleQuickJoin,
    handleCreateRoom,
    handleEnterCode,
    handleRoomClick,
  } = useRoomActions({ roomList, enterRoom });

  const { showToast } = useToastStore.getState();

  // 페이지 관련 함수
  const totalPages = Math.ceil(roomList.length / GAME1_ROOMS_PER_PAGE);
  const currentRooms = roomList.slice(
    (page - 1) * GAME1_ROOMS_PER_PAGE,
    page * GAME1_ROOMS_PER_PAGE
  );

  // 에러 처리
  useEffect(() => {
    console.log(showToast);
    if (!lobbyError) return;

    console.log("🔥 Game1LobbyPage에서 받은 로비에러:", lobbyError);

    // 공통 에러 처리 분기
    if (lobbyError.code === ROOM_NOT_EXIST) {
      showToast("alert", "방이 존재하지 않아요!", 3000);
    } else if (lobbyError.code === ROOM_PASSWORD_NOT_MATCHED) {
      showToast("alert", "비밀번호가 올바르지 않아요!", 3000);
    } else if (lobbyError.code === ROOM_IS_FULL) {
      showToast("alert", "방이 가득 찼어요!", 3000);
    } else {
      showToast("alert", "알 수 없는 에러 발생!", 3000);
    }
  }, [lobbyError, showToast]);

  // 룸아이디가 반환되면 대기방으로 이동
  useEffect(() => {
    if (enterRoomId) {
      console.log("✅ 방 입장 성공! 이동 →", enterRoomId);
      navigate(`/lobby/waiting?roomId=${enterRoomId}`);
    }
  }, [enterRoomId, navigate]);

  // 난이도 선택
  // todo: 필터링 구현하기
  const handleSelectLevel = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  return (
    <div className="game1-lobby-container">
      <div className="game1-filter-header">
        <span className="filter-title">로봇 성능</span>
        {GAME1_LEVEL_OPTIONS.map((level) => (
          <CheckBox
            key={level}
            label={level === "BASIC" ? "초보" : "고수"}
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
