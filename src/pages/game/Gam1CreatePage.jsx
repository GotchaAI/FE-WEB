import { useState } from "react";
import CheckBox from "commons/svgs/CheckBox";
import "styles/pages/game/Game1CreatePage.scss";
import CloseIcon from "commons/svgs/XIcon";
import OkayButton from "commons/svgs/OkayButton";
import { isNumeric } from "utils/validation";
import { useNavigate } from "react-router-dom";
import {
  GAME1_LEVEL_OPTIONS,
  GAME1_PLAYER_OPTIONS,
  GAME1_ROUND_OPTIONS,
} from "constants/game";

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

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      setPassword(value);
    }
  };

  const handleCreateRoom = () => {
    const payload = {
      title,
      round,
      player,
      level,
      password: isPrivate ? password : null,
      isPrivate,
    };
    console.log(payload);
    // TODO: 실제 API 요청 또는 상태 저장
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
      </div>

      <div className="middle-container">
        {/* 라운드 선택 */}
        <div className="form-group">
          <label className="form-label">라운드</label>
          <div className="checkbox-group">
            {roundOptions.map((r) => (
              <CheckBox
                key={r}
                label={r}
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
                label={p}
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
                label={l}
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
      </div>

      {/* 확인 버튼 */}
      <div className="okay-btn-wrapper">
        <OkayButton onClick={handleCreateRoom} />
      </div>
    </div>
  );
};

export default Game1CreatePage;
