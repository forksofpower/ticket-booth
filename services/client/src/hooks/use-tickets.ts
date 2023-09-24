import React from "react";

import { useRequest } from "./use-request";

export interface NewTicketFormInput {
  title: string;
  price: number;
}

export interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
  version: number;
}

const useTickets = () => {
  const [tickets, setTickets] = React.useState<Ticket[]>();
  const { doRequest: createTicket, errors: createTicketErrors } = useRequest<
    NewTicketFormInput,
    Ticket
  >({
    url: "/api/tickets",
    method: "post",
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  const { doRequest: listTickets, errors: listTicketsErrors } = useRequest<
    NewTicketFormInput,
    Ticket[]
  >({
    url: "/api/tickets",
    method: "get",
    onSuccess: (data) => {
      if (data!.length > 0) {
        setTickets(data);
      }
    },
  });

  return {
    state: {
      tickets,
    },
    actions: {
      listTickets,
      createTicket,
    },
    errors: {
      listTicketsErrors,
      createTicketErrors,
    },
  };
};

export default useTickets;
