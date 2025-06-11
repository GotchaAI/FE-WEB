import battleBGM from "assets/audio/battle.mp3";
import drawingBGM from "assets/audio/drawing.mp3";

import { useEffect, useRef } from "react";

const useBGM = (type) => {
  // 배경음악
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    switch (type) {
      case "DrawScene":
        if (!audioRef.current) {
          console.log(drawingBGM);
          audioRef.current = new Audio(drawingBGM); // 임시
          audioRef.current.loop = true; // 반복 재생
        }

        audioRef.current.play().catch((err) => {
          console.log("자동 재생 실패:", err);
        });
        break;

      case "BattleScene":
        if (!audioRef.current) {
          console.log(drawingBGM);
          audioRef.current = new Audio(battleBGM); // 임시
          audioRef.current.loop = true; // 반복 재생
        }

        audioRef.current.play().catch((err) => {
          console.log("자동 재생 실패:", err);
        });
        break;

      default:
        break;
    }

    return () => {
      // 컴포넌트 언마운트 시 음원 정지
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [type]);

  return {};
};

export default useBGM;
