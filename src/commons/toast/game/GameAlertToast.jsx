import wing from "assets/commons/toast/wing.png";
import "styles/commons/toast/game/GameAlertToast.scss";

const GameAlertToast = ({ message }) => {
  return (
    <>
      <img src={wing} alt="날개" className="wing" />
      <div className="game-alert-toast">{message}</div>
      <img src={wing} alt="날개" className="wing right" />
    </>
  );
};

export default GameAlertToast;
