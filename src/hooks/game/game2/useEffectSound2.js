import fail from "assets/audio/fail.mp3";
import pass from "assets/audio/pass.mp3";
import pray from "assets/audio/pray.mp3";
import opening from "assets/audio/game2opening.wav";
import huh from "assets/audio/huh.wav";
import okay_rabbit from "assets/audio/okay_rabbit.mp3";
import { useRef } from "react";

const soundMap = {
  fail,
  pass,
  pray,
  opening,
  huh,
  okay_rabbit,
};

const useEffectSound2 = () => {
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

export default useEffectSound2;
