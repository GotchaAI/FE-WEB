import logoImg from "assets/commons/logo.png";
import "styles/pages/game/game1/Game1Header.scss";
/**
 * Game1Header
 *
 * totalRound와 currentSceneIdx에 따른 현재 라운드 / 전체 라운드를 출력
 * answerResults 배열을 통해 각 라운드 누가 이겼는지 출력
 *
 */

const Game1Header = ({ totalRounds, currentSceneIdx, answerResults }) => {
  const currentRound = Math.floor(currentSceneIdx / 3);
  // TODO : answerResults가 아직 없음

  return (
    <div className="game1-header-container">
      {Array.from({ length: totalRounds }).map((_, idx) => (
        <div
          key={idx}
          className={`round-info-container ${
            idx === currentRound ? "active" : ""
          }`}
        >
          <span>Round {idx + 1}</span>
          <div className="round-result-container">
            <div
              className={`round-a ${
                answerResults[idx]?.[0] === "PLAYER"
                  ? "win"
                  : answerResults[idx]?.[0] === "AI"
                  ? "lose"
                  : ""
              }`}
            />
            <div
              className={`round-b ${
                answerResults[idx]?.[1] === "PLAYER"
                  ? "win"
                  : answerResults[idx]?.[1] === "AI"
                  ? "lose"
                  : ""
              }`}
            />
          </div>
        </div>
      ))}
      <img src={logoImg} className="logo-img" alt="로고" />
    </div>
  );
};

export default Game1Header;
