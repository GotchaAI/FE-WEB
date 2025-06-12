import LobbyBGM from "assets/audio/LobbyBGM.mp3";
import { useEffect, useRef, useCallback } from "react";

const useBGM3 = (type, volume = 1.0) => {
  const audioRef = useRef(null);

  // 🔇 외부에서 호출 가능한 중지 함수
  const stopBGM = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (type === "LobbyBGM") {
      const audio = new Audio(LobbyBGM);
      audio.loop = true;
      audio.volume = volume; // 🔊 볼륨 설정
      audio.play().catch((err) => {
        console.log("자동 재생 실패:", err);
      });
      audioRef.current = audio;
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [type, volume]);

  return { stopBGM };
};

export default useBGM3;
