const isFuture = (date) => {
  const now = getNowDate();
  const target = new Date(date);
  return now < target;
};

const getNowDate = () => {
  const now = new Date();
  return now;
};

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (isNaN(date)) return isoDate; // 변환 불가한 값은 원본 그대로 반환
  return date.toISOString().slice(0, 10).replaceAll("-", ".");
};

export { isFuture, getNowDate, formatDate };
