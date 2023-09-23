import React from "react";

import CountDownTimer from "@/components/countdown-timer";

type Props = {};

const ShowTicket = (props: Props) => {
  const [test, setTest] = React.useState(false);
  return (
    <>
      <CountDownTimer
        expiresAt={new Date().setMinutes(new Date().getMinutes() + 1)}
        onCountdownComplete={() => setTest(true)}
      />
      {test && <div>Countdown Complete!</div>}
    </>
  );
};

export default ShowTicket;
