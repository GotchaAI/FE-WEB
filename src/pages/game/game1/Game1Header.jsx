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
  const currentRound = Math.floor((currentSceneIdx - 1) / 3);

  const getRoundResultClass = (result) => {
    if (result === true) return "win";
    if (result === false) return "lose";
    return "";
  };

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
              className={`round-a ${getRoundResultClass(
                answerResults[idx]?.[0]
              )}`}
            />
            <div
              className={`round-b ${getRoundResultClass(
                answerResults[idx]?.[1]
              )}`}
            />
          </div>
        </div>
      ))}
      <img src={logoImg} className="logo-img" alt="로고" />
    </div>
  );
};

export default Game1Header;
