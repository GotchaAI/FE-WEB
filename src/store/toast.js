import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  showToast: (type, message = "", duration = 3000) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast = { id, type, message };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
}));