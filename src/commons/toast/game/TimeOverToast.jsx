import timeover from "assets/commons/toast/timeover.png";
import "styles/commons/toast/game/TimeOverToast.scss";

const TimeOverToast = () => {
  return (
    <div className="timeover-toast-wrapper">
      <img src={timeover} alt="Time Over" className="timeover-image" />
    </div>
  );
};

export default TimeOverToast;
