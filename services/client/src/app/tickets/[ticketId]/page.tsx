import { headers } from "next/headers";
import React from "react";

import { Ticket } from "@/hooks/use-tickets";
import buildClient from "@/utils/build-client";

import PurchaseTicketButton from "./purchase-ticket-button";

type ShowTicketPageProps = {
  params: {
    ticketId: string;
  };
};

async function fetchTicket(ticketId: string) {
  const client = buildClient(Object.fromEntries(headers().entries()));
  const res = await client.get<Ticket>(`/api/tickets/${ticketId}`);
  return res.data;
}

const ShowTicketPage = async ({
  params: { ticketId },
}: ShowTicketPageProps) => {
  const ticket = await fetchTicket(ticketId);
  return (
    <>
      <h1>{ticket.title}</h1>
      <p>price: ${ticket.price}</p>
      <PurchaseTicketButton ticketId={ticket.id} />
    </>
  );
};

export default ShowTicketPage;
