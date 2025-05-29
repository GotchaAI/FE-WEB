import { create } from "zustand";

export const useGameSocketStore = create((set) => ({
  stompClient: null,
  setStompClient: (client) => set({ stompClient: client }),
  clearStompClient: () => set({ stompClient: null }),
}));
