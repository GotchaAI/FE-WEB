// src/utils/getUserInfo.js
const { default: useUserInformationStore } = require("store/userInformation");

/**
 * 유저 정보 반환
 * @returns {object} 유저 프로필 및 경험치 정보와 setter 함수들
 */
const getUserInfo = () => {
  const { profile, experience, setProfile, setExperience } =
    useUserInformationStore.getState();

  return {
    profile,
    experience,
    setProfile,
    setExperience,
  };
};

export { getUserInfo };
