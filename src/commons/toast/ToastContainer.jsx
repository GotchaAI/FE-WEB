import { useToastStore } from "store/toast";
import AlertToast from "commons/toast/AlertToast";
import "styles/commons/toast/ToastContainer.scss";
import GameAlertToast from "commons/toast/game/GameAlertToast";
import TimeOverToast from "commons/toast/game/TimeOverToast";
import GameXToast from "commons/toast/game/GameXToast";
import GameOToast from "commons/toast/game/GameOToast";
import CountdownToast from "commons/toast/game/CountdownToast";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (!toasts || toasts.length === 0) return null;

  const renderToast = (type, message, index) => {
    switch (type) {
      case "alert":
        return <AlertToast key={index} message={message} />;
      case "gamealert":
        return <GameAlertToast key={index} message={message} />;
      case "timeover":
        return <TimeOverToast key={index} />;
      case "gameX":
        return <GameXToast key={index} />;
      case "gameO":
        return <GameOToast key={index} />;
      case "countdown":
        return <CountdownToast key={index} />;
      default:
        return null;
    }
  };

  const darkTypes = ["gamealert", "timeover", "countdown"];

  const backdropClassName = darkTypes.includes(toasts[0]?.type)
    ? "toast-backdrop-dark"
    : "toast-backdrop-none";

  return (
    <div className={backdropClassName}>
      {(toasts || []).map((toast, index) =>
        renderToast(toast.type, toast.message, index)
      )}
    </div>
  );
};

export default ToastContainer;
