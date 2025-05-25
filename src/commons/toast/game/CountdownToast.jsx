import count3 from "assets/commons/toast/count-3.png";
import count2 from "assets/commons/toast/count-2.png";
import count1 from "assets/commons/toast/count-1.png";
import { useEffect, useState } from "react";
import "styles/commons/toast/game/CountdownToast.scss";

const frames = [count3, count2, count1];

const CountdownToast = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frame >= frames.length - 1) return;

    const timer = setTimeout(() => {
      setFrame((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [frame]);

  return (
    <div className="countdown-toast-wrapper">
      <img
        src={frames[frame]}
        alt={`countdown-${3 - frame}`}
        className="countdown-image"
      />
    </div>
  );
};

export default CountdownToast;
