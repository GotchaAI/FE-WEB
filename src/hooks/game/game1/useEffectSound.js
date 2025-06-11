import correct from "assets/audio/correct.mp3";
import countdown from "assets/audio/countdown.mp3";
import defeat from "assets/audio/defeat.mp3";
import incorrect from "assets/audio/incorrect.mp3";
import pling from "assets/audio/pling.mp3";
import victory from "assets/audio/victory.mp3";
import { useRef } from "react";

const soundMap = {
  correct,
  incorrect,
  victory,
  defeat,
  countdown,
  pling,
};

const useEffectSound = () => {
  const audioRefs = useRef({});

  const playEffect = (type) => {
    // 이미 생성된 오디오 있으면 stop
    const existingAudio = audioRefs.current[type];
    if (existingAudio) {
      existingAudio.pause();
      existingAudio.currentTime = 0;
    }

    const src = soundMap[type];
    if (!src) return;

    const newAudio = new Audio(src);
    newAudio.loop = false;
    audioRefs.current[type] = newAudio;

    newAudio.play().catch((err) => {
      console.warn("자동 재생 실패:", err);
    });
  };

  return { playEffect };
};

export default useEffectSound;
