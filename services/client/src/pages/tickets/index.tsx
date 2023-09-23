import React from "react";

import useTickets from "@/hooks/use-tickets";

import { NextPageWithLayout } from "../_app";

type Props = {};

const TicketsPage: NextPageWithLayout = (props: Props) => {
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

TicketsPage.getLayout = (page) => {
  return page;
};

export default TicketsPage;
