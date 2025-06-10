import { useNavigate } from "react-router-dom";
import game2_rabbit from "assets/components/lobby/game2-lobby-rabbit.png";
import GameStartButton from "commons/svgs/GameStartButton";
import "styles/pages/game/Game2LobbyPage.scss";
import { startGame2API } from "services/game/game2";

const Game2LobbyPage = () => {
  const navigate = useNavigate();

  // 게임 시작 요청
  // 서버 요청 추가
  const gameStartHandler = async () => {
    try {
      const response = await startGame2API(); // gameId 받아오기
      const { message: gameId } = response;
      console.log(response);
      // const { gameId } = { gameId: 1234 };

      navigate(`/lobby/play2?gameId=${gameId}`);
    } catch (error) {
      console.error("게임 시작 실패", error);
    }
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
