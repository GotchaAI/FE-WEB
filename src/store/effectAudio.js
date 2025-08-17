import { create } from "zustand";

export const effectAudioStore = create((set, get) => ({
  effectAudio: null,
  effectVolume: 100,

  setEffectAudio: (effectAudio) => set({ effectAudio }),

  setEffectVolume: (v) => {
    set({ effectVolume: v });
    const a = get().effectAudio;
    if (!a) return;
    a.volume = v / 100;
  },
  pause: () => get().effectAudio?.pause(),
  stop: () => {
    const a = get().effectAudio;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  },
  init: () => {
    get().stop();
    get().setEffectAudio(null);
  },
}));
