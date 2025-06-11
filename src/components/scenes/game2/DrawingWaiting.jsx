import { useEffect } from "react";
import { useToastStore } from "store/toast";
import "styles/components/scenes/game2/DrawingWaiting.scss";

/**
 * DrawingWaiting 컴포넌트
 *
 * 그림 제출 이후 AI 평가가 진행되는 동안 사용자에게 "대기 중"임을 표시하는 컴포넌트입니다.
 * - 자동으로 일정 시간 후 (`10초`) 평가 완료 상태로 전환됩니다.
 * - 해당 시간 동안 토스트 메시지를 표시하여 기다리는 상황을 사용자에게 전달합니다.
 *
 * Props:
 * - onDone: 평가 완료 후 호출되는 콜백 함수 (다음 씬으로 전환하는 용도)
 *
 * Todl:
 * - 서버에서 결과 데이터가 모두 온다면 그때 넘어가는 것으로 하려 합니다.
 */

const DrawingWaiting = ({ onDone }) => {
  useEffect(() => {
    // 1. 'praywaiting' 타입의 토스트 메시지를 10초 동안 화면에 표시
    useToastStore.getState().showToast("praywaiting", "", 10000);

    // 2. 10초 후 자동으로 평가 완료 처리
    const timer = setTimeout(() => {
      onDone();
    }, 10000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  // UI는 따로 표시하지 않음 (오직 동작만 수행하는 오버레이 컴포넌트)
  return null;
};

export default DrawingWaiting;
