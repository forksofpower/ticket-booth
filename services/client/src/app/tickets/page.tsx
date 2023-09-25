import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

import { Ticket } from "@/hooks/use-tickets";
import { routes } from "@/routes";
import buildClient from "@/utils/build-client";

type Props = {};

async function fetchTickets() {
  const client = buildClient(Object.fromEntries(headers().entries()));
  const res = await client.get<Ticket[]>(`/api/tickets`);
  return res.data;
}

const TicketsPage = async (props: Props) => {
  const tickets = await fetchTickets();
  return (
    <div className="bg-content">
      <h1>My Tickets</h1>
      <Link href={routes.tickets.new()} className="btn btn-sm text-sm">
        <FaPlus />
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {tickets &&
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover">
                  <td>
                    <Link href={routes.tickets.show(ticket.id)}>
                      {ticket.title}
                    </Link>
                  </td>
                  <td>{ticket.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsPage;
