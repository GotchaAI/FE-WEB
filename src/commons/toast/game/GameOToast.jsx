import gameO from "assets/commons/toast/gameO.png";
import "styles/commons/toast/game/GameOXToast.scss";

const GameOToast = () => {
  return (
    <div className="ox-toast-wrapper">
      <img src={gameO} alt="O" className="ox-image" />
    </div>
  );
};

export default GameOToast;
