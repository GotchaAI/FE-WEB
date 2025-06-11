import fail_rabbit from "assets/components/scenes/game2/result-rabbit1.png";
import pass_rabbit from "assets/components/scenes/game2/result-rabbit2.png";
import "styles/components/scenes/game2/Game2ResultScene.scss";

const Game2ResultScene = ({ gameData, onExit }) => {
  const score = gameData.result?.score;
  const isPass = score >= 30;

  return (
    <div className={`game2-result-container ${isPass ? "pass" : "fail"}`}>
      <span className="result-title">축하합니다!</span>
      <span className="result-subtitle">
        {isPass ? "떴다 합격각ㅋ" : "와! 재수 확정!"}
      </span>

      <img
        src={isPass ? pass_rabbit : fail_rabbit}
        alt="Rabbit"
        className="result-rabbit"
      />

      <div className="game2-result-drawing">
        <img
          src={gameData.imageUrl}
          alt="내가 그린 그림"
          className="game2-drawing-img"
        />
      </div>

      <div className={`result-content ${isPass ? "pass" : "fail"}`}>
        <div className="result-score-box">
          <div className="score-title">SCORE</div>
          <div className="score-value">
            {score !== undefined ? score : "??"}
          </div>
        </div>

        <div className="result-feedback-box">
          {gameData.result?.feedback
            ? gameData.result.feedback
            : "채점중입니다..."}
        </div>
      </div>

      <button className="exit-button" onClick={onExit}>
        나가기
      </button>
    </div>
  );
};

export default Game2ResultScene;
