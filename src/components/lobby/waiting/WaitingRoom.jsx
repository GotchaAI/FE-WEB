import CheckBox from "commons/svgs/CheckBox";
import GameReadyButton from "commons/svgs/GameReadyButton";
import GameStartButton from "commons/svgs/GameStartButton";
import PlayerSlot from "components/lobby/waiting/PlayerSlot";
import useWaitingRoomSocket from "hooks/waiting-room/useWaitingRoomSocket";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "styles/components/lobby/waiting/WaitingRoom.scss";
import { getUserUuid } from "utils/user";

const dummyData = {
  roomMetadata: {
    id: "0767",
    title: "고양이의 비밀 방",
    owner: "테스트",
    hasPassword: false,
    password: "",
    max: 2,
    min: 2,
    difficulty: "ADVANCED",
    gameType: "TRICK_MYOMYO",
    roundCount: 3,
    ownerUuid: "2",
  },
  userInfos: [
    {
      userUuid: "2",
      nickname: "테스트",
      ready: false,
      isOwner: true,
    },
    {
      userUuid: "3",
      nickname: "관리자",
      ready: false,
      isOwner: false,
    },
  ],
};

const WaitingRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = "관리자"; // TODO: 닉네임 저장 기능 추가 후 적용
  const userUuid = getUserUuid();

  const [roomId, setRoomId] = useState(null); // 방번호
  const [roomInfo, setRoomInfo] = useState(null); // 방 전체 정보
  const [selectedDifficulty, setSelectedDifficulty] = useState("BASIC"); // 난이도
  const [isReady, setIsReady] = useState(false); // 준비 여부

  const { startGame, readyGame, unreadyGame, updateRoomInfo, quitRoom } =
    useWaitingRoomSocket({ roomId, setRoomInfo });

  // 최초 방정보 갱신
  // TODO: roomId로 방 세부 정보 받아오는 api 필요
  useEffect(() => {
    //setRoomInfo(location.state);
    console.log(location.state);

    const params = new URLSearchParams(location.search);
    const roomIdFromQuery = params.get("roomId");

    if (roomIdFromQuery) {
      setRoomId(roomIdFromQuery);
    }

    // TODO: 방 세부 정보 API 구축 후 연동
    // 테스트용
    setRoomInfo(dummyData);
  }, [location.search, location.state]);

  // 방정보 갱신 시 데이터 분배
  useEffect(() => {
    if (!roomInfo) return;

    // 내 정보 조회
    const myState = roomInfo.userInfos.find(
      (user) => user.nickname === nickname
    );
    // 레디 여부 적용
    setIsReady(myState?.ready);

    // 난이도 적용
    setSelectedDifficulty(roomInfo.roomMetadata.difficulty);
  }, [roomInfo]);

  // 방 나가기
  const quitRoomHandler = () => {
    quitRoom(roomId);
    navigate("/lobby");
  };

  // 게임 시작
  const gameStartHandler = () => {
    startGame(roomId);
  };

  // 게임 준비/취소
  const gameReadyHandler = () => {
    if (isReady) unreadyGame(roomId);
    else readyGame(roomId);

    setIsReady(!isReady);
  };

  // 난이도 변경
  const updateDifficultyHandler = (difficulty) => {
    if (difficulty === selectedDifficulty) return;
    setSelectedDifficulty(difficulty);

    // 업데이트 DTO
    const updateRoomDTO = {
      title: roomInfo.roomMetadata.title,
      hasPassword: roomInfo.roomMetadata.hasPassword,
      password: roomInfo.roomMetadata.password,
      difficulty: difficulty,
      roundCount: roomInfo.roomMetadata.roundCount,
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
              #{roomId} &nbsp; {roomInfo.roomMetadata.title}
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

            {userUuid === roomInfo.roomMetadata.ownerUuid ? (
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
