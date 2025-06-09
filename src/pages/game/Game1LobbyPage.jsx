import CheckBox from "commons/svgs/CheckBox";
import PageArrowButton from "commons/svgs/PageArrowButton";
import RoomTable from "components/game/Game1RoomTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "store/modal";
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

const Game1LobbyPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const userUuid = getUserUuid();

  const { roomList, selectedLevel, setSelectedLevel } =
    useRoomList("TRICK_MYOMYO");

  const { enterRoom, enterRoomId, lobbyError } = useLobbySocket({ userUuid });

  // 페이지 관련 함수
  const totalPages = Math.ceil(roomList.length / GAME1_ROOMS_PER_PAGE);
  const currentRooms = roomList.slice(
    (page - 1) * GAME1_ROOMS_PER_PAGE,
    page * GAME1_ROOMS_PER_PAGE
  );

  // 에러 처리
  useEffect(() => {
    if (!lobbyError) return;

    console.log("🔥 Game1LobbyPage에서 받은 로비에러:", lobbyError);

    // 공통 에러 처리 분기
    if (lobbyError.code === ROOM_NOT_EXIST) {
      useToastStore
        .getState()
        .showToast("alert", "방이 존재하지 않아요!", 3000);
    } else if (lobbyError.code === ROOM_PASSWORD_NOT_MATCHED) {
      useToastStore
        .getState()
        .showToast("alert", "비밀번호가 올바르지 않아요!", 3000);
    } else if (lobbyError.code === ROOM_IS_FULL) {
      useToastStore.getState().showToast("alert", "방이 가득 찼어요!", 3000);
    } else {
      useToastStore
        .getState()
        .showToast("alert", "알 수 없는 에러 발생!", 3000);
    }
  }, [lobbyError]);

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

  // 공개방 입장
  const handleEnterRoom = async (room) => {
    console.log(room);
    // 방이 존재하고, 공개방일 시 입장 시도
    if (room.roomId) {
      enterRoom(room.roomId, "");
    } else {
      console.log("방입장 실패");
    }
  };

  // 비밀방 입장
  const handleEnterSecretRoom = async (room) => {
    useModalStore.getState().openModal(
      "roomEnter",
      {
        roomType:
          room.gameType === "TRICK_MYOMYO"
            ? "묘묘를 속여라!"
            : "루루의 미대입시",
        hostName: room.owner,
        roomName: room.title,
      },
      async (password) => {
        console.log("입력한 비밀번호:", password);

        // 방이 존재하고, 비밀방일시 입장 시도
        if (room.roomId) {
          enterRoom(room.roomId, password);
        } else {
          console.log("방입장 실패");
        }
      }
    );
  };

  // 빠른 입장으로 입장
  const handleQuickJoin = () => {
    // 공개방만 필터링
    const publicRooms = roomList.filter((room) => !room.hasPassword);

    // 공개방이 없을 때
    if (publicRooms.length === 0) {
      useToastStore
        .getState()
        .showToast("alert", "입장 가능한 방이 존재하지 않아요!", 3000);
      return;
    }

    // 랜덤으로 1개 선택
    const randomIndex = Math.floor(Math.random() * publicRooms.length);
    const selectedRoom = publicRooms[randomIndex];

    // 바로 입장 시도
    handleEnterRoom(selectedRoom);
  };

  // 방생성 페이지로 이동
  const handleCreateRoom = () => {
    navigate("/lobby/game1/create");
  };

  // 코드 입력으로 방 입장
  const handleEnterCode = () => {
    // 코드 입력 모달 → Promise 로 받아오기
    new Promise((resolve) => {
      useModalStore
        .getState()
        .openModal("codeInput", { title: "코드 입력" }, resolve);
    }).then((code) => {
      console.log("입력된 코드:", code);

      // roomList 에서 해당 방 찾기
      const targetRoom = roomList.find((room) => room.roomId === code);
      console.log(targetRoom);

      // 방이 없을 때
      if (!targetRoom) {
        useToastStore
          .getState()
          .showToast("alert", "방이 존재하지 않아요!", 3000);
        return;
      }

      // 비번방인지 공개방인지
      if (targetRoom.hasPassword) {
        handleEnterSecretRoom(targetRoom);
      } else {
        handleEnterRoom(targetRoom);
      }
    });
  };

  // 방목록 클릭으로 입장
  const handleRoomClick = (room) => {
    if (room.hasPassword) {
      // 비밀방일 경우 비밀번호 입력
      handleEnterSecretRoom(room);
    } else {
      // 공개방일 경우 바로 입장
      handleEnterRoom(room);
      console.log(`[${room.title}] 에 입장~`);
    }
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
