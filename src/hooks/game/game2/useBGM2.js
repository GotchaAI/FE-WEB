import drawingBGM from "assets/audio/drawing2.mp3";
import description from "assets/audio/description.mp3";
import { useEffect, useRef, useCallback } from "react";

const useBGM2 = (type, volume = 1.0) => {
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

    if (type === "DrawScene") {
      const audio = new Audio(drawingBGM);
      audio.loop = true;
      audio.volume = volume; // 🔊 볼륨 설정
      audio.play().catch((err) => {
        console.log("자동 재생 실패:", err);
      });
      audioRef.current = audio;
    }

    if (type === "Description") {
      const audio = new Audio(description);
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

export default useBGM2;
