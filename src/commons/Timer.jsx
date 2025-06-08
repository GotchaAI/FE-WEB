import { useEffect, useRef, useState } from "react";
import "styles/commons/Timer.scss";

/**
 * Timer : 절대 종료 시간(endTime) 기준으로 1초마다 남은 시간을 계산하여 프로그래스 바를 줄여 나감
 *
 * @param {string|Date} endTime - 종료 시각(ISO 문자열 혹은 Date 객체)
 * @param {number}       flow    - 1~2:진행 중, 3+:종료 대기
 * @param {function}     goToNextFlow - 남은 시간이 0이 되면 호출할 콜백
 */
const Timer = ({ endTime, flow = 2, goToNextFlow }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const initialDurationRef = useRef(0);

  // endTime이 바뀔 때(또는 처음 마운트 될 때)만 전체 지속시간과 초기 timeLeft를 설정
  useEffect(() => {
    if (!endTime) return;
    const endMs = new Date(endTime).getTime();
    const nowMs = Date.now();
    const diffSec = Math.max(0, Math.floor((endMs - nowMs) / 1000));

    initialDurationRef.current = diffSec;
    setTimeLeft(diffSec);
  }, [endTime]);

  // flow가 “진행 중”(1 또는 2)일 때만 타이머를 돌린다
  useEffect(() => {
    if (!endTime) return;
    if (flow === 0 || flow > 2) return;

    const endMs = new Date(endTime).getTime();
    const intervalId = setInterval(() => {
      const nowMs = Date.now();
      const diffSec = Math.max(0, Math.floor((endMs - nowMs) / 1000));
      setTimeLeft(diffSec);

      if (diffSec <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
        goToNextFlow?.(); // 남은 시간이 0이 되면 다음 흐름으로 이동
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime, flow, goToNextFlow]);

  const initial = initialDurationRef.current || 1;
  const progressWidth = `${((timeLeft / initial) * 100).toFixed(2)}%`;

  return (
    <div className="timer-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progressWidth }}></div>
      </div>
    </div>
  );
};

export default Timer;
