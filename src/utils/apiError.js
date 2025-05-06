// api 에러 코드 핸들링 함수
export const handleApiError = (error, handlers) => {
  const code = error?.response?.data.code;

  console.log(handlers[code]);
  if (code) {
    handlers[code]();
  }
};