import { create } from 'zustand';

export const useModalStore = create((set) => ({
  type: null,            // 예: 'alert', 'confirm', 'report' 등
  props: {},             // 모달에 전달할 데이터
  onConfirm: null,       // 확인 콜백

  openModal: (type, props = {}, onConfirm) => {
    set({ type, props, onConfirm })
  },

  closeModal: () =>
    set({ type: null, props: {}, onConfirm: null }),
}));
