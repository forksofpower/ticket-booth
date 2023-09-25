import axios from "axios";
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
  const client = axios.create({
    baseURL: "/",
    withCredentials: true,
  });
  const [tickets, setTickets] = React.useState<Ticket[]>();
  const [currentTicket, setCurrentTicket] = React.useState<Ticket>();
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

  async function showTicketById(ticketId: string) {
    const response = await client.get<Ticket>(`/tickets/${ticketId}`);
    const ticket = response.data;
    if (!ticket) {
      console.error(`Error fetching ticket: ${ticketId}`);
      return;
    }

    setCurrentTicket(ticket);
  }
  return {
    state: {
      tickets,
      currentTicket,
    },
    actions: {
      listTickets,
      setCurrentTicket,
      showTicketById,
      createTicket,
    },
    errors: {
      listTicketsErrors,
      createTicketErrors,
    },
  };
};

export default useTickets;
