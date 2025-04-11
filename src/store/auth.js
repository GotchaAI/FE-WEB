import { create } from "zustand";

export const userToken = create((set) => ({
  accessToken: "",
  expireTime: "",
  setAccessToken: (newToken, expireTime) =>
    set({ accessToken: newToken, expireTime: expireTime }),
}));
