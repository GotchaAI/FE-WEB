import fail_rabbit from "assets/components/scenes/game2/result-rabbit1.png";
import pass_rabbit from "assets/components/scenes/game2/result-rabbit2.png";
import "styles/components/scenes/game2/Game2ResultScene.scss";

const Game2ResultScene = ({ gameData, onExit }) => {
  return (
    <div className="game2-result-container">
      <span className="result-title">축하합니다!</span>
      <span className="result-subtitle">와! 재수 확정!</span>

      <img src={fail_rabbit} alt="Rabbit" className="result-rabbit" />

      <div className="game2-result-drawing">
        <img
          src={gameData.imageUrl}
          alt="내가 그린 그림"
          className="game2-drawing-img"
        />
      </div>

      <div className="result-content">
        <div className="result-score-box">
          <div className="score-title">SCORE</div>
          <div className="score-value">{gameData.result.score || 22}</div>
        </div>

        <div className="result-feedback-box">
          {gameData.result.feedback || "asdf"}
        </div>
      </div>

      <button className="exit-button" onClick={onExit}>
        나가기
      </button>
    </div>
  );
};

export default Game2ResultScene;
