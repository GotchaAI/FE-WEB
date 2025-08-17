import { create } from "zustand";

export const audioStore = create((set, get) => ({
  audio: null,
  setAudio: (audio) => set({ audio }),

  setVolume: (v) => {
    const a = get().audio;
    if (!a) return;
    a.volume = v;
  },
  pause: () => get().audio?.pause(),
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
