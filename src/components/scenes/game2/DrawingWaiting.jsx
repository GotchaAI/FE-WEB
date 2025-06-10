import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game2/DrawingWaiting.scss";

const DrawingWaiting = ({ onDone }) => {
  useEffect(() => {
    useToastStore.getState().showToast("praywaiting", "", 5000);
    setTimeout(() => {
      onDone();
    }, 5000);
  }, []);

  return null;
};

export default DrawingWaiting;
