import { headers } from "next/headers";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import TitleCard from "@/components/cards/TitleCard";
import { routes } from "@/routes";

async function fetchTickets() {
  const res = await fetch(`http://ticket-booth.example.com/api/tickets`, {
    headers: {
      ...Object.fromEntries(headers()),
      host: "ticket-booth.example.com",
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  // const res = await buildClient(Object.fromEntries(headers())).get<Ticket[]>(
  //   `http://ticket-booth.example.com/api/tickets`
  // );
  return data;
}

const TicketsPage = async () => {
  const tickets = await fetchTickets();

  return (
    <div className="page-container">
      <TitleCard title="My Tickets" topMargin={"mt-0"}>
        <Link href={routes.createTicket()} className="btn btn-sm text-sm">
          <FaPlus />
        </Link>
      </TitleCard>
    </div>
  );
};

export default TicketsPage;
