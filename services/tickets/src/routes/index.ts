import { listTicketRouter } from "./list";
import { createTicketRouter } from "./new";
import { showTicketRouter } from "./show";
import { updateTicketRouter } from "./update";

export const routes = [
  createTicketRouter,
  showTicketRouter,
  listTicketRouter,
  updateTicketRouter,
];
