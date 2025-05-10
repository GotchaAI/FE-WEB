/**
 * 에러 핸들러
 * @param {any} error - API 요청 중 발생한 에러
 * @param {object} messageMap - 상태코드별 메시지 객체
 *
 */
export const handleApiError = (error, messageMap = {}) => {
  const status = error?.response?.status;
  const code = error?.response?.data?.code;

  const entry = messageMap[status];

  if (typeof entry === "string") return entry;

  if (typeof entry === "object") {
    if (code && typeof entry[code] === "string") return entry[code];
    if (typeof entry.default === "string") return entry.default;
  }

  console.warn("Unhandled API error:", { status, code });
  return "예기치 않은 오류가 발생했습니다.";
};