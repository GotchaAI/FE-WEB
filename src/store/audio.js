import { create } from "zustand";

export const audioStore = create((set, get) => ({
  audio: null,
  volume: 100,

  setAudio: (audio) => set({ audio }),

  setVolume: (v) => {
    set({ volume: v });

    const a = get().audio;
    if (!a) return;
    a.volume = v / 100;
  },
  pause: () => get().audio?.pause(),
  start: () => get().audio?.play(),
  stop: () => {
    const a = get().audio;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  },
  init: () => {
    get().stop();
    get().setAudio(null);
  },
}));
