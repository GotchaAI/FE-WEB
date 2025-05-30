import gameO from "assets/commons/toast/gameO.png";
import "styles/commons/toast/game/GameOXToast.scss";

const GameOToast = () => {
  return (
    <div className="ox-toast-container">
      <img src={gameO} alt="정답" className="ox-image" />
    </div>
  );
};

export default GameOToast;
