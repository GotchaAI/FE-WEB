import "styles/components/lobby/gamehistory/GameHistory.scss";
import { useMemo, useState } from "react";

const TABS = ["묘묘", "루루", "전체"];
const ROUNDS = ["1R", "2R", "3R", "4R", "5R"];

// 샘플 전적 데이터
const HISTORY = [
  {
    round: "1R",
    prompt: "집가고싶어요",
    top: ["망치 (80.08%)", "망치 (72.41%)", "망치 (68.03%)"],
    verdict: "ai", // ai | user
    note: "나의 승리다…삐빅",
    time: "방금전",
  },
  {
    round: "1R",
    prompt: "집가고싶어요",
    top: ["망치 (80.08%)", "망치 (72.41%)", "망치 (68.03%)"],
    verdict: "user",
    note: "플레이어의 역전!",
    time: "방금전",
  },
  {
    round: "1R",
    prompt: "집가고싶어요",
    top: ["망치 (80.08%)", "망치 (72.41%)", "망치 (68.03%)"],
    verdict: "ai", // ai | user
    note: "나의 승리다…삐빅",
    time: "방금전",
  },
  {
    round: "1R",
    prompt: "집가고싶어요",
    top: ["망치 (80.08%)", "망치 (72.41%)", "망치 (68.03%)"],
    verdict: "user",
    note: "플레이어의 역전!",
    time: "방금전",
  },
];

const GameHistory = () => {
  const [selectedTab, setSelectedTab] = useState("묘묘");
  const [selectedRound, setSelectedRound] = useState("1R");

  const visibleHistory = useMemo(
    () => HISTORY.filter((h) => h.round === selectedRound),
    [selectedRound]
  );

  return (
    <div className="game-history-container">
      <div className="book-sidebar" />
      <div className="book-sidebar" />
      <nav className="tab-list">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="history-content-container">
        <div className="history-header">
          루루의 미대입시<span className="history-meta">방금전</span>
        </div>
        {/* 라운드 탭 */}
        <nav className="round-tab-list">
          {ROUNDS.map((round) => (
            <button
              key={round}
              className={`round-tab ${selectedRound === round ? "active" : ""}`}
              onClick={() => setSelectedRound(round)}
            >
              {round}
            </button>
          ))}
        </nav>
        {/* 전적 리스트 */}
        <ul className="history-list-scroll">
          {visibleHistory.map((h, i) => (
            <li
              key={`${h.round}-${i}`}
              className={`history-card ${
                h.verdict === "ai" ? "ai-win" : "user-win"
              }`}
            >
              {/* 왼쪽: 프롬프트 박스 */}
              <div className="prompt-col">
                <div className="prompt-head">
                  <div className="prompt-head-title">{h.prompt}</div>
                  <div className="prompt-deco-box"></div>
                </div>
                <div className="prompt-body"></div>
              </div>

              {/* 가운데: 유사도 TOP */}
              <div className="similarity-col">
                <div className="sim-title">유사도 TOP</div>
                <ol className="sim-list">
                  {h.top.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* x 버튼 */}
    </div>
  );
};

export default GameHistory;
