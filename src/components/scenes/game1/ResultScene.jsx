import aiChatImg from "assets/components/scenes/game1/ai-chat.png";
import aiImg from "assets/components/scenes/game1/ai.png";
import playerChatImg from "assets/components/scenes/game1/player-chat.png";
import userImg from "assets/components/scenes/game1/player.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/components/scenes/game1/ResultScene.scss";

const ResultScene = ({ gameResultInfo }) => {
  const navigate = useNavigate();
  const [selectedRound, setSelectedRound] = useState(0);

  const gameWinner = gameResultInfo.playerWon; // 우승자 : true: 플레이어 승, false: AI 승
  const totalRounds = gameResultInfo.totalRounds;

  const round = Array.from({ length: totalRounds }, (_, idx) => (
    <button
      key={idx}
      className={`round-select-btn ${selectedRound === idx ? "active" : ""}`}
      onClick={() => setSelectedRound(idx)}
    >
      {`${idx + 1}R`}
    </button>
  ));

  const roundResultInfo = gameResultInfo.rounds.map((round) => ({
    words: round.words.map((word) => ({
      word: word.word,
      nickname: word.drawerName,
      imageURL: word.imageURL,
      aiPredictions: word.aiPredictions,
      score: word.score,
      isWin: word.playerWon,
    })),
  }));

  const gameEndHandler = () => {
    // 게임 종료 api 로직

    // 대기방으로 이동
    navigate(`../waiting?roomId=${gameResultInfo.roomId}`);
  };

  return (
    <div className="result-scene-container">
      {/* 플레이어 아바타 */}
      <div className="user-container">
        <div className="user">
          <img
            className={`${gameWinner ? "win" : "lose"}`}
            src={userImg}
            alt="플레이어"
          />
        </div>
        {gameWinner && (
          <div className="player-result-chat">
            <img src={playerChatImg} alt="플레이어 말풍선" />
            <span className="player-chat">우리가 이겼어!!</span>
          </div>
        )}
      </div>

      {/* 결과 영역 */}
      <div className="result-container">
        <div className="game-result-container">
          <div className="round-container">{round}</div>
          <div className="round-detail-container">
            {roundResultInfo[selectedRound].words.map((wordInfo, index) => (
              <div
                className={`round-detail ${wordInfo.isWin ? "win" : "lose"}`}
                key={`round-detail${index}`}
              >
                <div className="drawing-container">
                  <div className="nickname-container">
                    <span className="nickname">{wordInfo.nickname}</span>
                    <div
                      className={`post-it ${wordInfo.isWin ? "win" : "lose"}`}
                    />
                  </div>
                  <img
                    src={wordInfo.imageURL}
                    alt={`round-${selectedRound + 1}-word-${index}`}
                    className="drawing-image"
                  />
                </div>
                <div className="ai-prediction-container">
                  <div className="word-label">{wordInfo.word}</div>
                  <ul className="ai-predictions">
                    {wordInfo.aiPredictions.map((prediction, idx) => (
                      <li className="prediction" key={`prediction-${idx}`}>
                        <span className="predict">{prediction.predicted}</span>
                        <span className="percent">
                          ({prediction.confidence.toFixed(1)}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`score-container ${
                    wordInfo.isWin ? "win" : "lose"
                  }`}
                >
                  <span className={`score-${index}`}>{wordInfo.score}p</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="exit-btn" onClick={gameEndHandler}>
          나가기
        </button>
      </div>

      {/* AI 아바타 */}
      <div className="ai-container">
        <img
          className={`${!gameWinner ? "win" : "lose"}`}
          src={aiImg}
          alt="인공지능"
        />
      </div>
      {!gameWinner && (
        <div className="ai-result-chat">
          <img className="ai-chat" src={aiChatImg} alt="ai 말풍선" />
        </div>
      )}
    </div>
  );
};

export default ResultScene;
