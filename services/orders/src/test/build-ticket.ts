import { Ticket } from "../models/ticket";

export const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  return ticket;
};
