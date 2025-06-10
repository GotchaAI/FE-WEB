import CheckBox from "commons/svgs/CheckBox";
import GameReadyButton from "commons/svgs/GameReadyButton";
import GameStartButton from "commons/svgs/GameStartButton";
import PlayerSlot from "components/lobby/waiting/PlayerSlot";
import useWaitingRoomSocket from "hooks/waiting-room/useWaitingRoomSocket";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoomDetailAPI } from "services/lobby/waiting/waitingRoom";
import "styles/components/lobby/waiting/WaitingRoom.scss";
import { getUserUuid } from "utils/user";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userUuid = getUserUuid();

  const [roomId, setRoomId] = useState(null); // 방번호
  const [roomInfo, setRoomInfo] = useState(null); // 방 전체 정보
  const [selectedDifficulty, setSelectedDifficulty] = useState("BASIC"); // 난이도
  const [isReady, setIsReady] = useState(false); // 준비 여부
  const [isOwner, setIsOwner] = useState(false);

  const {
    startGame,
    readyGame,
    unreadyGame,
    updateRoomInfo,
    quitRoom,
    ownerChange,
    kickPlayer,
    isGameStart,
    initGameInfo,
  } = useWaitingRoomSocket({ roomId, userUuid, setRoomInfo });

  // 최초 방정보 갱신
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomIdFromQuery = params.get("roomId");

    if (roomIdFromQuery) {
      setRoomId(roomIdFromQuery);
    }

    initRoomDetail(roomIdFromQuery); // 방 초기화
  }, [location.search, location.state]);

  // 방 초기화 요청
  const initRoomDetail = async (roomIdFromQuery) => {
    try {
      const res = await getRoomDetailAPI(roomIdFromQuery);
      setRoomInfo(res);
    } catch (e) {
      console.error(e);
    }
  };

  // 방정보 갱신 시 데이터 분배
  useEffect(() => {
    if (!roomInfo) return;

    // 내 정보 조회
    const myState = roomInfo.userInfos.find(
      (user) => user.userUuid === userUuid
    );

    const isMeOwner = roomInfo.roomInfo.ownerUuid === userUuid;
    // 방장 여부
    setIsOwner(isMeOwner);

    // 레디 여부 적용
    setIsReady(myState?.ready);
    // 난이도 적용
    setSelectedDifficulty(roomInfo.roomInfo.difficulty);
  }, [roomInfo]);

  // 게임 시작
  useEffect(() => {
    if (!isGameStart || !initGameInfo) return;

    navigate(`../play?roomId=${roomId}`, { state: initGameInfo });
  }, [isGameStart, initGameInfo, navigate, roomId]);

  // 방 나가기
  const quitRoomHandler = () => {
    quitRoom(roomId);
    navigate("/lobby");
  };

  // 게임 시작 요청
  const gameStartHandler = () => {
    startGame(roomId);
  };

  // 게임 준비/취소
  const gameReadyHandler = () => {
    if (isReady) unreadyGame(roomId);
    else readyGame(roomId);

    setIsReady((prev) => !prev);
  };

  // 난이도 변경
  const updateDifficultyHandler = (difficulty) => {
    if (!isOwner) return;
    if (difficulty === selectedDifficulty) return;
    setSelectedDifficulty(difficulty);

    // 업데이트 DTO
    const updateRoomDTO = {
      title: roomInfo.roomInfo.title,
      hasPassword: roomInfo.roomInfo.hasPassword,
      difficulty: difficulty,
      roundCount: roomInfo.roomInfo.roundCount,
    };

    updateRoomInfo(roomId, updateRoomDTO);
  };

  return (
    <div className="waiting-room-container">
      {roomInfo === null ? (
        <div>대기중...</div>
      ) : (
        <>
          <div className="room-info-header-container">
            <span className="room-info">
              #{roomId} &nbsp; {roomInfo.roomInfo.title}
            </span>
            <button className="room-quit-btn" onClick={quitRoomHandler}>
              방 나가기
            </button>
          </div>
          <div className="player-grid">
            {Array.from({ length: 8 }, (_, i) => (
              <PlayerSlot
                key={roomInfo.userInfos[i]?.nickname ?? `empty-${i}`}
                index={i}
                player={roomInfo.userInfos[i]}
                ownerChange={ownerChange}
                kickPlayer={kickPlayer}
              />
            ))}
          </div>
          <div className="settings-start">
            <div className="difficulty-selector">
              <span className="label">로봇 성능</span>

              <div className="checkbox-options">
                <CheckBox
                  label="초보"
                  checked={selectedDifficulty === "BASIC"}
                  onChange={() => updateDifficultyHandler("BASIC")}
                />
                <CheckBox
                  label="고수"
                  checked={selectedDifficulty === "ADVANCED"}
                  onChange={() => updateDifficultyHandler("ADVANCED")}
                />
              </div>
            </div>

            {userUuid === roomInfo.roomInfo.ownerUuid ? (
              <label className="start-btn-wrapper">
                <GameStartButton onClick={gameStartHandler} />
              </label>
            ) : (
              <label className="ready-btn-wrapper">
                <GameReadyButton onClick={gameReadyHandler} />
              </label>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
