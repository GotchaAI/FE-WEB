import { create } from "zustand";

const useUserInformationStore = create((set) => ({
  profile: null,
  experience: null,

  setProfile: (profileInfo) => set({ profile: profileInfo }),
  setExperience: (expInfo) => set({ experience: expInfo }),

  clearUser: () => set({ profile: null, experience: null }),
}));

export default useUserInformationStore;
