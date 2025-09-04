// 길이를 입력받아 랜덤한 인덱스를 반환 [0,length)
const randomIdxSelect = (length) => {
  return Math.floor(Math.random() * length);
};

export { randomIdxSelect };
