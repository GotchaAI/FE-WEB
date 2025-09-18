import { getVolumes } from "utils/audio";
import { create } from "zustand";

const volumeMap = getVolumes();

const initTrack = (type) => {
  return {
    audio: null,
    volume: volumeMap[type],
  };
};

export const audioStore = create((set, get) => ({
  tracks: {
    bgm: initTrack("bgm"),
    sfx: initTrack("sfx"),
  },

  setAudio: (key, audio) =>
    set((state) => {
      const track = state.tracks?.[key];
      if (!track) return state;

      const prevAudio = track.audio;
      if (prevAudio && prevAudio !== audio) {
        get().pause(key);
      }

      return {
        tracks: {
          ...state.tracks,
          [key]: {
            ...track,
            audio,
          },
        },
      };
    }),

  setVolume: (key, volume) =>
    set((state) => {
      const track = state.tracks?.[key];
      if (!track) return state;

      const vol = Math.max(0, Math.min(100, Number(volume)));
      if (track.audio) {
        track.audio.volume = vol / 100;
      }

      return {
        tracks: {
          ...state.tracks,
          [key]: {
            ...track,
            volume: vol,
          },
        },
      };
    }),

  pause: (key) => {
    const audio = get().tracks[key]?.audio;
    audio?.pause();
  },

  start: (key) => {
    const audio = get().tracks[key]?.audio;
    audio?.play();
  },

  stop: (key) => {
    const audio = get().tracks[key]?.audio;
    if (!audio) return;

    get().pause(key);
    audio.currentTime = 0;
  },

  init: (key) => {
    get().stop(key);
    get().setAudio(key, null);
  },
}));
