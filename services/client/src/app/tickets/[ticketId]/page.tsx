"use client";
import React from "react";

import CountDownTimer from "@/components/countdown-timer";

type ShowTicketProps = {
  params: {
    ticketId: string;
  };
};

const ShowTicket = (props: ShowTicketProps) => {
  const ticketId = props.params.ticketId;
  const [test, setTest] = React.useState(false);
  return (
    <>
      {/* <CountDownTimer
        expiresAt={new Date().setMinutes(new Date().getMinutes() + 1)}
        onCountdownComplete={() => setTest(true)}
      />
      {test && <div>Countdown Complete!</div>} */}
      <h1>Ticket: {ticketId}</h1>
    </>
  );
};

export default ShowTicket;
