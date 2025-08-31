import { useCallback, useEffect } from "react";
import { audioStore } from "store/audio";

const useAudio = (newAudio) => {
  const { setAudio, init } = audioStore.getState();
  const getTrack = (type) => audioStore.getState().tracks?.[type];

  const playTrack = useCallback(
    async (newAudio) => {
      const { type, src, isLoop } = newAudio;

      const { prevAudio, volume } = getTrack(type);

      if (prevAudio) {
        init(type);
      }

      const audio = new Audio(src);
      audio.volume = volume / 100;
      audio.loop = isLoop;

      setAudio(type, audio);

      audio.play().catch((e) => {
        console.log("재생 오류 : ", e);
      });
    },
    [setAudio],
  );

  useEffect(() => {
    if (!newAudio) return;
    playTrack(newAudio);
    return () => init(newAudio.type);
  }, [newAudio]);

  return { playTrack };
};

export default useAudio;
