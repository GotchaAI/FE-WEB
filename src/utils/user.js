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

/**
 * 유저 uuid 반환
 * @returns {String} 유저 uuid
 */
const getUserUuid = () => {
  const { profile } = getUserInfo();
  const uuid = profile.uuid;

  return uuid;
};

const getUserName = () => {
  const { profile } = getUserInfo();
  const nickname = profile.nickname;
  return nickname;
};

export { getUserInfo, getUserUuid, getUserName };
