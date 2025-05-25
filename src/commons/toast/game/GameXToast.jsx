import gameX from "assets/commons/toast/gameX.png";
import "styles/commons/toast/game/GameOXToast.scss";

const GameXToast = () => {
  return (
    <div className="ox-toast-container">
      <img src={gameX} alt="오답" className="ox-image" />
    </div>
  );
};

export default GameXToast;
