import { useNavigate } from "react-router-dom";
import game2_rabbit from "assets/components/lobby/game2-lobby-rabbit.png";
import GameStartButton from "commons/svgs/GameStartButton";
import "styles/pages/game/Game2LobbyPage.scss";
import { startGame2API } from "services/game/game2";

/**
 * Game2LobbyPage 컴포넌트
 *
 * 이 컴포넌트는 Game 2의 로비 화면을 구성합니다.
 * - 사용자에게 게임 시작 버튼과 캐릭터 이미지를 보여줍니다.
 * - 사용자가 시작 버튼을 클릭하면 서버에 게임 시작 요청(startGame2API)을 보냅니다.
 * - 응답으로 받은 gameId를 기반으로 게임 플레이 페이지(`/lobby/play2?gameId=...`)로 이동시킵니다.
 *
 * 주요 기능:
 * - 비동기 게임 시작 요청 처리
 * - 게임 시작 실패 시 콘솔 에러 출력
 * - 동적으로 페이지 이동 처리
 */

const Game2LobbyPage = () => {
  const navigate = useNavigate();

  const gameStartHandler = async () => {
    try {
      const response = await startGame2API();
      const { message: gameId } = response;
      console.log(response);
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
