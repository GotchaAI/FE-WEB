import { useToastStore } from "store/toast";
import AlertToast from "commons/toast/AlertToast";
import "styles/commons/toast/ToastContainer.scss";
import GameAlertToast from "commons/toast/game/GameAlertToast";
import TimeOverToast from "commons/toast/game/TimeOverToast";
import GameXToast from "commons/toast/game/GameXToast";
import GameOToast from "commons/toast/game/GameOToast";
import CountdownToast from "commons/toast/game/CountdownToast";
import PrayWaitingToast from "./game/PrayWaitingToast";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (!toasts || toasts.length === 0) return null;

  const renderToast = (type, message, id) => {
    switch (type) {
      case "alert":
        return <AlertToast key={id} message={message} />;
      case "gamealert":
        return <GameAlertToast key={id} message={message} />;
      case "timeover":
        return <TimeOverToast key={id} />;
      case "gameX":
        return <GameXToast key={id} />;
      case "gameO":
        return <GameOToast key={id} />;
      case "countdown":
        return <CountdownToast key={id} />;
      case "praywaiting":
        return <PrayWaitingToast key={id} />;
      default:
        return null;
    }
  };

  const darkTypes = ["gamealert", "timeover", "countdown", "praywaiting"];

  const backdropClassName = darkTypes.includes(toasts[0]?.type)
    ? "toast-backdrop-dark"
    : "toast-backdrop-none";

  return (
    <div className={backdropClassName}>
      {(toasts || []).map((toast) =>
        renderToast(toast.type, toast.message, toast.id)
      )}
    </div>
  );
};

export default ToastContainer;
