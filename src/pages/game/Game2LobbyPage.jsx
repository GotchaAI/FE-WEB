import game2_rabbit from "assets/components/lobby/game2-lobby-rabbit.png";
import GameStartButton from "commons/svgs/GameStartButton";
import "styles/pages/game/Game2LobbyPage.scss";

const Game2LobbyPage = () => {
  // 게임 시작 요청
  const gameStartHandler = () => {
    console.log("game2 시작~");
  };

  return (
    <div className="game2-lobby-container">
      <img src={game2_rabbit} alt="Game 2 Rabbit" className="rabbit-image" />
      <div className="game2-start-btn">
        <GameStartButton onClick={gameStartHandler} />
      </div>
    </div>
  );
};

export default Game2LobbyPage;
