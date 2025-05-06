/**
 * 에러 핸들러
 * @param {any} error - API 요청 중 발생한 에러
 * @param {object} handlers - 상태코드별 핸들러 객체
 *
 */
export const handleApiError = (error, handlers = {}) => {
  const status = error?.response?.status;
  const code = error?.response?.data?.code;

  const handlerEntry = handlers[status];

  if (typeof handlerEntry === 'function') {
    // 단순 status 처리
    handlerEntry();
    return;
  }

  if (typeof handlerEntry === 'object') {
    // 세부 코드 존재 시 우선 처리
    if (code && typeof handlerEntry[code] === 'function') {
      handlerEntry[code]();
      return;
    }

    // fallback (default) 처리
    if (typeof handlerEntry.default === 'function') {
      handlerEntry.default();
      return;
    }
  }

  console.error('Unhandled API error:', { status, code, error });
};
