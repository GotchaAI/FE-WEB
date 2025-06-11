import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game2/DrawingWaiting.scss";

const DrawingWaiting = ({ onDone }) => {
  useEffect(() => {
    useToastStore.getState().showToast("praywaiting", "", 10000);
    setTimeout(() => {
      onDone();
    }, 10000);
  }, []);

  return null;
};

export default DrawingWaiting;
