import { headers } from "next/headers";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import RequireAuth from "@/components/auth/require-auth";
import TitleCard from "@/components/cards/TitleCard";
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
    <RequireAuth>
      <div className="page-container">
        <TitleCard title="My Tickets" topMargin={"mt-0"}>
          <Link href={routes.createTicket()} className="btn btn-sm text-sm">
            <FaPlus />
          </Link>
          <TicketList tickets={tickets} />
        </TitleCard>
      </div>
    </RequireAuth>
  );
};

export default TicketsPage;
