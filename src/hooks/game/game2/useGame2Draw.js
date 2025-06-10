import { useCallback, useEffect, useState } from "react";

const useGame2Draw = ({ isDrawingDisabled,
  setIsDrawingDisabled, getImageUrl, onSubmit }) => {
  const [flow, setFlow] = useState(2); // 기본 진행 중

  // 제출 핸들러
  const submitHandler = useCallback(async () => {
    setIsDrawingDisabled(true);

    const imageUrl = await getImageUrl();

    // 3초 후 4 -> DrawingWaiting 씬 보여줌
    setTimeout(() => {
      setFlow(4);
    }, 3000);

    await onSubmit?.(imageUrl); // 서버 제출 + 평가 요청


  }, [getImageUrl, setIsDrawingDisabled]);

  // ⏹️ 게임 종료
  useEffect(() => {
    if (flow < 3) return;

    // 아직 제출 안 한 경우
    if (!isDrawingDisabled) {
      submitHandler(); // 그림 자동 제출 로직
    }
  }, [flow, isDrawingDisabled, setIsDrawingDisabled, submitHandler]);

  return { flow, setFlow, submitHandler };
};

export default useGame2Draw;
