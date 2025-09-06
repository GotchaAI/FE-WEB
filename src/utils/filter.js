// loation.pathname(url 경로)의 마지막 경로를 반환해준다.
// ex) lobby/game/fun -> fun 반환
const getLastLocationPath = (path) => {
  const pathArr = path.split("/");
  return pathArr[pathArr.length - 1];
};

export { getLastLocationPath };
