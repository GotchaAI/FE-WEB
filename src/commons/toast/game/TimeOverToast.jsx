import timeover from "assets/commons/toast/timeover.png";
import "styles/commons/toast/game/TimeOverToast.scss";

const TimeOverToast = () => {
  return (
    <div className="timeover-toast-container">
      <img src={timeover} alt="시간초과" className="timeover-image" />
    </div>
  );
};

export default TimeOverToast;
