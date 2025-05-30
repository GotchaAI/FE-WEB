import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  showToast: (type, message = "", duration = 3000) => {
    const toastId = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast = { toastId, type, message };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.toastId !== toastId),
      }));
    }, duration);
  },
}));