import { useEffect, useState } from "react";
import CheckBox from "commons/svgs/CheckBox";
import "styles/pages/game/Game1CreatePage.scss";
import OkayButton from "commons/svgs/OkayButton";
import { isFourDigitNumber, isNumeric } from "utils/validation";
import { useNavigate } from "react-router-dom";
import {
  GAME1_LEVEL_OPTIONS,
  GAME1_PLAYER_OPTIONS,
  GAME1_ROUND_OPTIONS,
} from "constants/game";
import { getUserUuid } from "utils/user";
import useLobbySocket from "hooks/lobby/useLobbySocket";
import {
  PASSWORD_EMPTY_ERROR_MESSAGE,
  PASSWORD_FOUR_DIGIT_ERROR_MESSAGE,
  ROOM_TITLE_INPUT_ERROR_MESSAGE,
} from "constants/errorMessage";
import CloseButton from "commons/ui/button/CloseButton";
import { GAME1_ROBBY_URL } from "constants/url";

const roundOptions = GAME1_ROUND_OPTIONS;
const playerOptions = GAME1_PLAYER_OPTIONS;
const levelOptions = GAME1_LEVEL_OPTIONS;

const Game1CreatePage = () => {
  const [title, setTitle] = useState("");
  const [round, setRound] = useState(roundOptions[0]);
  const [player, setPlayer] = useState(playerOptions[0]);
  const [level, setLevel] = useState(levelOptions[0]);
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const userUuid = getUserUuid();
  const { createRoom, enterRoomId, lobbyError } = useLobbySocket({ userUuid });

  // 비밀번호 입력 감시 및 처리
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPassword(value);
    }
  };

  // 폼검증 후 방생성
  const handleCreateRoom = async () => {
    setTitleError("");
    setPasswordError("");

    // 에러 여부 flag
    let hasError = false;

    // 방 제목 검사
    if (!title.trim()) {
      setTitleError(ROOM_TITLE_INPUT_ERROR_MESSAGE);
      hasError = true;
    }

    // 비밀번호 검사 (비공개 시)
    if (isPrivate) {
      if (!password) {
        setPasswordError(PASSWORD_EMPTY_ERROR_MESSAGE);
        hasError = true;
      } else if (!isFourDigitNumber(password)) {
        setPasswordError(PASSWORD_FOUR_DIGIT_ERROR_MESSAGE);
        hasError = true;
      }
    }

    // 에러가 있으면 방 생성 시도 안 함
    if (hasError) return;

    const payload = {
      title,
      maxUser: Number(player),
      hasPassword: isPrivate,
      password: isPrivate ? password : "",
      difficulty: level, // todo 바꿔야함
      gameType: "TRICK_MYOMYO", // 고정
      roundCount: Number(round),
    };

    // 방생성 시도
    createRoom(payload);
  };

  useEffect(() => {
    if (enterRoomId) {
      console.log("✅ 방 생성 성공! 이동 →", enterRoomId);
      navigate(`/lobby/waiting?roomId=${enterRoomId}`);
    }
  }, [enterRoomId, navigate]);

  // 에러 감지 시 처리
  useEffect(() => {
    if (!lobbyError) return;
    if (lobbyError.code === "GLOBAL-400-001") {
      // 필드값 유효하지 않을 시
      console.error("❌ 에러 발생:", lobbyError);
    }
  }, [lobbyError]);

  return (
    <div className="game1-create-container">
      <div className="game1-create-header">
        <span>방 만들기</span>
        <CloseButton onClick={() => navigate(GAME1_ROBBY_URL)} />
      </div>

      {/* 방 제목 */}
      <div className="form-group">
        <label className="form-label">방 제목</label>
        <input
          type="text"
          placeholder="방 제목을 입력해주세요."
          value={title}
          maxLength={50}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <span className="error-text">{titleError}</span>}
      </div>

      <div className="middle-container">
        {/* 라운드 선택 */}
        <div className="form-group">
          <label className="form-label">라운드</label>
          <div className="checkbox-group">
            {roundOptions.map((r) => (
              <CheckBox
                key={r}
                label={r + "round"}
                checked={round === r}
                onChange={() => setRound(r)}
              />
            ))}
          </div>
        </div>

        {/* 인원수 선택 */}
        <div className="form-group">
          <label className="form-label">인원수</label>
          <div className="checkbox-group">
            {playerOptions.map((p) => (
              <CheckBox
                key={p}
                label={p + "명"}
                checked={player === p}
                onChange={() => setPlayer(p)}
                disabled={p !== 2}
              />
            ))}
          </div>
        </div>

        {/* 난이도 선택 */}
        <div className="form-group">
          <label className="form-label">난이도</label>
          <div className="checkbox-group">
            {levelOptions.map((l) => (
              <CheckBox
                key={l}
                label={l === "BASIC" ? "초보" : "고수"}
                checked={level === l}
                onChange={() => setLevel(l)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 비밀번호 및 비공개 */}
      <div className="form-group">
        <label className="form-label">비밀번호</label>
        <div className="password-section">
          <input
            type="tel"
            maxLength={4}
            value={password}
            disabled={!isPrivate}
            onChange={handlePasswordChange}
          />
          <div className="open-status">
            <CheckBox
              label="비공개"
              checked={isPrivate}
              onChange={() => {
                const next = !isPrivate;
                setIsPrivate(next);
                if (!next) {
                  setPassword("");
                }
              }}
            />
          </div>
        </div>
        {passwordError && <span className="error-text">{passwordError}</span>}
      </div>

      {/* 확인 버튼 */}
      <div className="okay-btn-wrapper">
        <OkayButton onClick={handleCreateRoom} />
      </div>
    </div>
  );
};

export default Game1CreatePage;
