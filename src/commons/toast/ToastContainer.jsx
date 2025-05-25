import { useToastStore } from "store/toast";
import AlertToast from "./AlertToast";
import "styles/commons/toast/ToastContainer.scss";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (!toasts || toasts.length === 0) return null;

  const renderToast = (type, message, index) => {
    switch (type) {
      case "alert":
        return <AlertToast key={index} message={message} />;
      case "error":
      // return <ToastError key={index} message={message} />;
      case "info":
      // return <ToastInfo key={index} message={message} />;
      default:
        return null;
    }
  };

  return (
    <div className="toast-backdrop-default">
      {(toasts || []).map((toast, index) =>
        renderToast(toast.type, toast.message, index)
      )}
    </div>
  );
};

export default ToastContainer;
