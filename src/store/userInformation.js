import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserInformationStore = create(
  persist(
    (set) => ({
      profile: {
        email: "로딩 중",
        nickname: "로딩 중",
        role: "로딩 중",
        uuid: "로딩 중",
      },
      experience: {
        level: "로딩 중",
        expInLevel: "로딩 중",
        expProgress: "로딩 중",
        expToNextLevel: "로딩 중",
      },

      setProfile: (profileInfo) => set({ profile: profileInfo }),
      setExperience: (expInfo) => set({ experience: expInfo }),
      clearUser: () => set({ profile: null, experience: null }),
    }),
    {
      name: "user-information",
      partialize: (state) => ({
        profile: state.profile,
        experience: state.experience,
      }),
    }
  )
);

export default useUserInformationStore;
