import { useToastStore } from "store/toast";
import AlertToast from "./AlertToast";
import "styles/commons/toast/ToastContainer.scss";
import GameAlertToast from "./game/GameAlertToast";
import TimeOverToast from "./game/TimeOverToast";
import GameXToast from "./game/GameXToast";
import GameOToast from "./game/GameOToast";

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
      default:
        return null;
    }
  };

  const backdropClassName =
    toasts[0]?.type === "alert"
      ? "toast-backdrop-default"
      : "toast-backdrop-game";

  return (
    <div className={backdropClassName}>
      {(toasts || []).map((toast, index) =>
        renderToast(toast.type, toast.message, index)
      )}
    </div>
  );
};

export default ToastContainer;
