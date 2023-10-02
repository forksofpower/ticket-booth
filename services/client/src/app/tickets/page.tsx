import { headers } from "next/headers";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import { Ticket } from "@/hooks/use-tickets";
import { routes } from "@/routes";
import buildClient from "@/utils/build-client";

import TicketList from "./ticket-list";

async function fetchTickets() {
  const res = await buildClient(Object.fromEntries(headers())).get<Ticket[]>(
    `/api/tickets`
  );
  return res.data;
}

const TicketsPage = async () => {
  const tickets = await fetchTickets();
  return (
    <div className="bg-content container">
      <h1>My Tickets</h1>
      <Link href={routes.tickets.new()} className="btn btn-sm text-sm">
        <FaPlus />
      </Link>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
