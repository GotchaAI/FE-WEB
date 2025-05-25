import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  showToast: (type, message = '', duration = 3000) => {
    const toast = { type, message };
    set((state => ({ toasts: [...state.toasts, toast] })));

    setTimeout(() => {
      set((state) => {
        const [, ...rest] = state.toasts;
        return { toasts: rest };
      })
    }, duration);
  }
})
);