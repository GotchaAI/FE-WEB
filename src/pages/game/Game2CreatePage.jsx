import { useState } from "react";
import CheckBox from "commons/svgs/CheckBox";
import "styles/pages/game/Game2CreatePage.scss";
import CloseIcon from "commons/svgs/XIcon";
import OkayButton from "commons/svgs/OkayButton";

const roundOptions = ["1round", "2round", "3round", "4round", "5round"];
const playerOptions = ["2명", "4명", "6명", "8명"];
const levelOptions = ["초보", "고수", "신"];

const Game2CreatePage = () => {
  const [title, setTitle] = useState("");
  const [rounds, setRounds] = useState([]);
  const [players, setPlayers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const toggleOption = (value, setFunc, current) => {
    if (current.includes(value)) {
      setFunc(current.filter((v) => v !== value));
    } else {
      setFunc([...current, value]);
    }
  };

  const handleSubmit = () => {
    const payload = {
      title,
      rounds,
      players,
      levels,
      password: isPrivate ? password : null,
      isPrivate,
    };
    // TODO: 실제 API 요청 또는 상태 저장
  };

  return (
    <div className="game2-create-container">
      <div className="game2-create-header">
        <span>방 만들기</span>
        <button>
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

      <div className="middle-section">
        {/* 라운드 선택 */}
        <div className="form-group">
          <label className="form-label">라운드</label>
          <div className="checkbox-group">
            {roundOptions.map((r) => (
              <CheckBox
                key={r}
                label={r}
                checked={rounds.includes(r)}
                onChange={() => toggleOption(r, setRounds, rounds)}
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
                checked={players.includes(p)}
                onChange={() => toggleOption(p, setPlayers, players)}
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
                checked={levels.includes(l)}
                onChange={() => toggleOption(l, setLevels, levels)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="open-status">
            <CheckBox
              label="비공개"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
          </div>
        </div>
      </div>

      {/* 확인 버튼 */}
      <div className="okay-btn-wrapper">
        <OkayButton />
      </div>
    </div>
  );
};

export default Game2CreatePage;
