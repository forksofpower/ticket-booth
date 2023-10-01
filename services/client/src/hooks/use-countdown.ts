// Based on https://www.npmjs.com/package/react-countdown-hook
// with some modifications to make it more generic and to
// allow for a custom interval.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface TimerRef {
  started?: number;
  lastInterval?: number;
  timeToCount?: number;
  requestId?: number;
  timeLeft?: number;
}

interface TimerActions {
  start: (ttc?: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

// Enum for counter statuses.
export enum CounterStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  Finished = "Finished",
}

type UseCountDownHook = (
  timeToCount?: number,
  interval?: number
) => [number, CounterStatus, TimerActions];

const useCountDown: UseCountDownHook = (
  timeToCount: number = 60 * 1000,
  interval: number = 1000
) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<CounterStatus>(CounterStatus.Idle);
  const timer = useRef<TimerRef>({});

  const run = (ts: number): void => {
    if (timer.current.started === undefined) {
      timer.current.started = ts;
      timer.current.lastInterval = ts;
    }

    const localInterval = Math.min(
      interval,
      timer.current.timeLeft || Infinity
    );

    if (ts - (timer.current.lastInterval || 0) >= localInterval) {
      timer.current.lastInterval =
        (timer.current.lastInterval || 0) + localInterval;
      setTimeLeft((prevTimeLeft) => {
        timer.current.timeLeft = prevTimeLeft - localInterval;
        return timer.current.timeLeft!;
      });
    }

    if (ts - (timer.current.started || 0) < (timer.current.timeToCount || 0)) {
      timer.current.requestId = window.requestAnimationFrame(run);
    } else {
      timer.current = {};
      setTimeLeft(0);
      setStatus(CounterStatus.Finished);
    }
  };

  const start = useCallback((ttc?: number): void => {
    window.cancelAnimationFrame(timer.current.requestId || 0);

    const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
    timer.current = {
      timeToCount: newTimeToCount,
      requestId: window.requestAnimationFrame(run),
    };

    setTimeLeft(newTimeToCount);
    setStatus(CounterStatus.Running);
  }, []);

  const pause = useCallback((): void => {
    window.cancelAnimationFrame(timer.current.requestId || 0);
    timer.current.started = undefined;
    timer.current.lastInterval = undefined;
    timer.current.timeToCount = timer.current.timeLeft;
    setStatus(CounterStatus.Paused);
  }, []);

  const resume = useCallback((): void => {
    if (
      timer.current.started === undefined &&
      (timer.current.timeLeft || 0) > 0
    ) {
      timer.current.requestId = window.requestAnimationFrame(run);
      setStatus(CounterStatus.Running);
    }
  }, []);

  const reset = useCallback((): void => {
    if (timer.current.timeLeft) {
      window.cancelAnimationFrame(timer.current.requestId || 0);
      timer.current = {};
      setTimeLeft(0);
      setStatus(CounterStatus.Idle);
    }
  }, []);

  const actions: TimerActions = useMemo(
    () => ({ start, pause, resume, reset }),
    []
  );

  useEffect(() => {
    return () => window.cancelAnimationFrame(timer.current.requestId || 0);
  }, []);

  return [timeLeft, status, actions];
};

export default useCountDown;
