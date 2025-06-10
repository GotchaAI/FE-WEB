import art_table from "assets/components/scenes/game2/art-table.png"; // 방금 올리신 이미지 경로 사용
import "styles/components/scenes/game2/Game2Opening.scss";

const Game2ResultScene = ({ gameData, onExit }) => {
  return (
    <div className="game2-opening-container">
      {/* <img src={art_table} alt="Art Table" className="game2-opening-table" /> */}
      {/* 그린 그림 */}
      {gameData.imageUrl && (
        <img
          src={gameData.imageUrl}
          alt="내가 그린 그림"
          className="game2-result-drawing"
        />
      )}
      <div>score: {gameData.result.score}</div>
      <div>description: {gameData.result.feedback} </div>
      <button onClick={onExit}></button>
    </div>
  );
};

export default Game2ResultScene;
