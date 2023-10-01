"use client";
import React from "react";

import useCountDown, { CounterStatus } from "@/hooks/use-countdown";

const CountDownDigit: React.FC<{ value: number }> = ({ value }) => {
  return (
    <span className="countdown font-mono text-2xl">
      <span style={{ "--value": value } as any}></span>
    </span>
  );
};
function getMillisecondsUntilExpiration(expiresAt: string | number) {
  return new Date(expiresAt).getTime() - new Date().getTime();
}

const CountDownTimer: React.FC<{
  expiresAt: number | string;
  onCountdownComplete?: () => void;
  options?: {
    countDownCompleteDelay?: number;
  };
}> = ({ expiresAt, onCountdownComplete, options }) => {
  const [timeLeft, counterStatus, actions] = useCountDown(
    getMillisecondsUntilExpiration(expiresAt)
  );

  React.useEffect(() => {
    actions.start();
  }, []);

  React.useEffect(() => {
    if (counterStatus === CounterStatus.Finished && timeLeft === 0) {
      // optional delay allows for the countdown to finish animating
      if (onCountdownComplete) {
        setTimeout(onCountdownComplete, options?.countDownCompleteDelay || 0);
      }
      actions.pause();
    }
  }, [
    actions,
    counterStatus,
    onCountdownComplete,
    options?.countDownCompleteDelay,
    timeLeft,
  ]);
  return (
    <>
      {timeLeft !== undefined && (
        <div className="flex gap-5">
          <div>
            <CountDownDigit value={Math.floor(timeLeft! / 1000 / 60)} />
            min
          </div>
          <div>
            <CountDownDigit value={Math.floor((timeLeft! / 1000) % 60)} />
            sec
          </div>
        </div>
      )}
    </>
  );
};

export default CountDownTimer;
