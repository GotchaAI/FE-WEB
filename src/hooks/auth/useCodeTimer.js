import { useEffect, useState, useRef, useCallback } from "react";

const useCodeTimer = (initialSeconds = 300, onExpire) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimestampRef = useRef(null);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        startTimestampRef.current = Date.now();
        setIsRunning(true);
        setRemainingTime(initialSeconds);
    }, [initialSeconds]);

    const reset = useCallback(() => {
        setIsRunning(false);
        startTimestampRef.current = null;
        clearInterval(intervalRef.current);
        setRemainingTime(0);
    }, []);

    useEffect(() => {
        if (!isRunning) return;

        intervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimestampRef.current) / 1000);
            const timeLeft = Math.max(initialSeconds - elapsed, 0);

            setRemainingTime(timeLeft);

            if (timeLeft === 0) {
                reset();
                onExpire?.(); // 만료 콜백 호출
            }
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isRunning, initialSeconds, reset, onExpire]);

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
