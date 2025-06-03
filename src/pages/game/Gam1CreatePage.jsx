import { useState } from "react";
import CheckBox from "commons/svgs/CheckBox";
import "styles/pages/game/Game1CreatePage.scss";
import CloseIcon from "commons/svgs/XIcon";
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
  const { createRoom, enterRoom, enterRoomId } = useLobbySocket({ userUuid });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPassword(value);
    }
  };

  const handleCreateRoom = async () => {
    setTitleError("");
    setPasswordError("");

    // 에러 여부 flag
    let hasError = false;

    // 방 제목 검사
    if (!title.trim()) {
      setTitleError("방 제목을 입력하세요.");
      hasError = true;
    }

    // 비밀번호 검사 (비공개 시)
    if (isPrivate) {
      if (!password) {
        setPasswordError("비밀번호를 입력하세요.");
        hasError = true;
      } else if (!isFourDigitNumber(password)) {
        setPasswordError("비밀번호는 4자리 숫자로 입력하세요.");
        hasError = true;
      }
    }

    // 에러가 있으면 → 방 생성 시도 안 함
    if (hasError) return;

    const payload = {
      title,
      maxUser: Number(player), // API 요구: Integer
      hasPassword: isPrivate,
      password: isPrivate ? password : "", // required field
      difficulty: "BASIC", // "BASIC" or "ADVANCED"
      gameType: "TRICK_MYOMYO", // 고정
      roundCount: Number(round), // API 요구: Integer
    };

    const result = await createRoom(payload);

    if (result.success && result.roomId) {
      console.log("방 생성 성공 → 이동!", result.roomId);
      navigate(`/lobby/waiting?roomId=${result.roomId}`);
    } else {
      console.error("방 생성 실패 → 이동 안함");
    }
  };

  return (
    <div className="game1-create-container">
      <div className="game1-create-header">
        <span>방 만들기</span>
        <button onClick={() => navigate("/lobby/game1")}>
          <CloseIcon />
        </button>
      </div>

      {/* 방 제목 */}
      <div className="form-group">
        <label className="form-label">방 제목</label>
        <input
          type="text"
          placeholder="방 제목을 입력하세요."
          value={title}
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
                onChange={() => {
                  if (round !== r) setRound(r);
                }}
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
                onChange={() => {
                  if (player !== p) setPlayer(p);
                }}
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
                onChange={() => {
                  if (level !== l) setLevel(l);
                }}
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
            type="text"
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
