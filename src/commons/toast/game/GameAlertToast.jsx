import wing from "assets/commons/toast/wing.png";
import "styles/commons/toast/game/GameAlertToast.scss";

const GameAlertToast = ({ message }) => {
  return (
    <>
      <img src={wing} className="wing" />
      <div className="game-alert-toast">{message}</div>
      <img src={wing} className="wing right" />
    </>
  );
};

export default GameAlertToast;
