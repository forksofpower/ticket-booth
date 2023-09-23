import React from "react";

const CountDownDigit: React.FC<{ value: number }> = ({ value }) => {
  return (
    <span className="countdown font-mono text-2xl">
      <span style={{ "--value": value } as any}></span>
    </span>
  );
};

const CountDownTimer: React.FC<{
  expiresAt: number | string;
  onCountdownComplete: () => void;
}> = ({ expiresAt, onCountdownComplete }) => {
  const [timeLeft, setTimeLeft] = React.useState<number>();
  React.useEffect(() => {
    const findTimeLeft = () => {
      // TODO: number is working here?
      let msLeft = Math.max(
        0,
        (new Date(expiresAt) as unknown as number) -
          (new Date() as unknown as number)
      );
      setTimeLeft(Math.round(msLeft));
    };
    findTimeLeft();

    const interval = setInterval(findTimeLeft, 1000);

    if (timeLeft === 0) {
      console.log("Countdown Complete!");
      onCountdownComplete();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, []);
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
