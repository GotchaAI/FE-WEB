import { useNavigate } from "react-router-dom";
import game2_rabbit from "assets/components/lobby/game2-lobby-rabbit.png";
import GameStartButton from "commons/svgs/GameStartButton";
import "styles/pages/game/Game2LobbyPage.scss";

const Game2LobbyPage = () => {
  const navigate = useNavigate();

  // 게임 시작 요청
  const gameStartHandler = async () => {
    try {
      console.log("게임 데이터 요청 중...");
      // 예시: 서버에 API 요청
      // const response = await fetch("/api/game2/start");
      // const data = await response.json();

      // 임시 mock 데이터
      const data = {
        keyword: "초코 케이크",
        timeLimit: 60,
        // ... 기타 게임 데이터
      };

      console.log("게임 데이터 수신 완료:", data);

      // 페이지 이동 + 데이터 전달
      navigate("/lobby/play2", { state: data });
    } catch (error) {
      console.error("게임 데이터 요청 실패", error);
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
