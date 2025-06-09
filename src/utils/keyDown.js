export const isPressEnterKey = (e) => {
  return e.key === "Enter" && !e.shiftKey;
};
