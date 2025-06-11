const isFuture = (date) => {
  const now = getNowDate();
  const target = new Date(date);
  return now < target;
};

const getNowDate = () => {
  const now = new Date();
  return now;
};

export { isFuture, getNowDate };
