import gameX from "assets/commons/toast/gameX.png";
import "styles/commons/toast/game/GameOXToast.scss";

const GameXToast = () => {
  return (
    <div className="ox-toast-wrapper">
      <img src={gameX} alt="X" className="ox-image" />
    </div>
  );
};

export default GameXToast;
