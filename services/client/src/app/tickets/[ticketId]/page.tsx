import { headers } from "next/headers";

import { Ticket } from "@/hooks/use-tickets";
import buildClient from "@/utils/build-client";

import PurchaseTicketButton from "./purchase-ticket-button";

type ShowTicketPageProps = {
  params: {
    ticketId: string;
  };
};

async function fetchTicket(ticketId: string) {
  const res = await buildClient(Object.fromEntries(headers())).get<Ticket>(
    `/api/tickets/${ticketId}?revalidate=/api/tickets`
  );
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
