import { useEffect, useState, useRef, useCallback } from "react";

// 타이머 시작 시간 기준으로 실시간 남은 시간을 계산하여 정확한 카운트다운을 제공
// 타이머 만료 시 자동 콜백(onExpire) 실행
const useCodeTimer = (initialSeconds = 300, onExpire) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimestampRef = useRef(null);
    const intervalRef = useRef(null);

    // 현재 시각을 기준으로 타이머 시작
    const start = useCallback(() => {
        startTimestampRef.current = Date.now();
        setIsRunning(true);
        setRemainingTime(initialSeconds);
    }, [initialSeconds]);

    // 타이머 초기화
    const reset = useCallback(() => {
        setIsRunning(false);
        startTimestampRef.current = null;
        clearInterval(intervalRef.current);
        setRemainingTime(0);
    }, []);

    // 현재 시각과 시작 시간 차이를 계산해 남은 시간 갱신
    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
            const timeLeft = Math.max(initialSeconds - elapsed, 0);

            setRemainingTime(timeLeft);

            // 만료 시 reset, onExpire 호출
            if (timeLeft === 0) {
                reset();
                onExpire?.();
            }
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isRunning, initialSeconds, reset, onExpire]);

    // 시간 포매팅 함수 "MM:SS"
    const formatTime = useCallback((seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    }, []);

    return {
        remainingTime,
        formattedTime: formatTime(remainingTime),
        start,
    };
};

export default useCodeTimer;
