import pray_rabbit from "assets/components/scenes/game2/pray-rabbit.png";
import "styles/commons/toast/game/PrayRabbitToast.scss";

const PrayWaitingToast = () => {
  return (
    <div className="pray-rabbit-toast-container">
      <div className="pray-say-container">
        하느님 부처님 어머니 할머니 고조할머니 할아버지 제가 대학을 갈 수 있게
        해주세요
      </div>
      <img src={pray_rabbit} alt="시간초과" className="pray-rabbit-image" />
    </div>
  );
};

export default PrayWaitingToast;
