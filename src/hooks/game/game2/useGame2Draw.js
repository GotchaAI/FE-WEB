import { useCallback, useEffect, useState } from "react";
import { useModalStore } from "store/modal";

/**
 * useGame2Draw 커스텀 훅
 *
 * Game2의 그림 씬에서 타이머 종료 시 자동 제출 및 제출 흐름 전환을 관리하는 훅입니다.
 *
 * Params:
 * - isDrawingDisabled: 현재 그리기 가능 여부 (boolean)
 * - setIsDrawingDisabled: 그리기 가능 여부 상태 변경 함수
 * - getImageUrl: 현재 캔버스의 이미지를 URL로 반환하는 함수
 * - onSubmit: 서버에 이미지 제출 및 평가 요청하는 콜백 함수
 *
 * Returns:
 * - flow: 현재 진행 흐름 상태 (2=그리는 중, 3=제출됨, 4=로딩/대기)
 * - setFlow: 외부에서 flow를 제어할 수 있도록 공개
 * - submitHandler: 수동 제출 시 호출되는 제출 처리 함수
 */

const useGame2Draw = ({ isDrawingDisabled, setIsDrawingDisabled, getImageUrl, onSubmit }) => {
  const [flow, setFlow] = useState(2); // 기본 흐름: 그리는 중 (2)

  // 제출 처리 함수
  const submitHandler = useCallback(async () => {
    // 제출 시작 시 더 이상 그릴 수 없도록 비활성화
    setIsDrawingDisabled(true);

    // 현재 그림을 이미지 URL로 변환
    const imageUrl = await getImageUrl();
    useModalStore.getState().closeModal()
    // 3초 후 flow를 4로 전환 → 평가 결과 대기 상태로 이동
    setTimeout(() => {
      setFlow(4);
    }, 3000);

    // 서버로 그림 제출 및 평가 요청
    await onSubmit?.(imageUrl);
  }, [getImageUrl, setIsDrawingDisabled, onSubmit]);

  // flow가 3 이상일 때 자동 제출 처리
  useEffect(() => {
    if (flow < 3) return;

    // 사용자가 제출하지 않은 상태라면 자동 제출 실행
    if (!isDrawingDisabled) {
      submitHandler();
    }
  }, [flow, isDrawingDisabled, submitHandler, setIsDrawingDisabled]);

  return { flow, setFlow, submitHandler };
};

export default useGame2Draw;
