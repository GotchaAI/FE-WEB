// api 에러 코드 핸들링 함수
export const handleApiError = (error, handlers) => {
  const status = error?.response?.status;

  if (status && handlers[status]) {
    handlers[status](error.response?.data);
  }
};