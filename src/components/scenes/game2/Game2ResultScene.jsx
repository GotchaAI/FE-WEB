import art_table from "assets/components/scenes/game2/art-table.png"; // 방금 올리신 이미지 경로 사용
import "styles/components/scenes/game2/Game2Opening.scss";

const Game2ResultScene = ({ gameData, onExit }) => {
  return (
    <div className="game2-opening-container">
      <img src={art_table} alt="Art Table" className="game2-opening-table" />
      <div>score: {gameData.result.score}</div>
      <div>description: {gameData.result.feedback} </div>
      <button onClick={onExit}></button>
    </div>
  );
};

export default Game2ResultScene;
