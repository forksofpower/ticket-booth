"use client";
import Link from "next/link";

import { Ticket } from "@/hooks/use-tickets";
import { routes } from "@/routes";

type TicketListProps = {
  tickets: Ticket[];
};
// something
function TicketList({ tickets }: TicketListProps) {
  return (
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
                <Link href={routes.showTicket(ticket.id)}>{ticket.title}</Link>
              </td>
              <td>{ticket.price}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TicketList;
