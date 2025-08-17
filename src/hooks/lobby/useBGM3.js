import LobbyBGM from "assets/audio/LobbyBGM.mp3";
import { useEffect, useCallback } from "react";
import { audioStore } from "store/audio";

const useBGM3 = (type, volume = 1.0) => {
  const { audio, setAudio, stop, init } = audioStore.getState();

  // 🔇 외부에서 호출 가능한 중지 함수
  const stopBGM = useCallback(() => {
    stop();
  }, []);

  useEffect(() => {
    if (audio) {
      init();
    }

    if (type === "LobbyBGM") {
      const audio = new Audio(LobbyBGM);
      audio.loop = true;
      audio.volume = volume;
      audio.play().catch((err) => {
        console.log("자동 재생 실패:", err);
      });
      setAudio(audio);
    }

    return () => {
      init();
    };
  }, [type, volume]);

  return { stopBGM };
};

export default useBGM3;
