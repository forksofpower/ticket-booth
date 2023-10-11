import { headers } from "next/headers";

import TitleCard from "@/components/cards/TitleCard";
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
    <div className="page-container">
      <TitleCard title="Ticket Details" topMargin={"mt-0"}>
        <h1>{ticket.title}</h1>
        <p>price: ${ticket.price}</p>
        <div className="divider"></div>
        <PurchaseTicketButton ticketId={ticket.id} />
      </TitleCard>
    </div>
  );
};

export default ShowTicketPage;
