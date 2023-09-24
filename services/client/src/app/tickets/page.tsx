"use client";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

import useTickets from "@/hooks/use-tickets";
import { routes } from "@/routes";

type Props = {};

const TicketsPage = (props: Props) => {
  const {
    state: { tickets },
    actions: { listTickets },
  } = useTickets();

  React.useEffect(() => {
    listTickets();
  }, []);
  return (
    <div className="bg-content">
      <h1>My Tickets</h1>
      <Link href={routes.tickets.new()} className="btn text-l">
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
                  <td>{ticket.title}</td>
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
