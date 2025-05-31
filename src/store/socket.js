import { create } from "zustand";

export const useGameSocketStore = create((set) => ({
  stompClient: null,
  isConnected: false,
  setStompClient: (client) => set({ stompClient: client }),
  setIsConnected: (isConnected) => set({ isConnected: isConnected }),
  clearStompClient: () => set({ stompClient: null }),
}));
