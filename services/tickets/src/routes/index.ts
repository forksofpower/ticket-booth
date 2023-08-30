import { listTicketRouter } from "./list";
import { createTicketRouter } from "./new";
import { showTicketRouter } from "./show";

export const routes = [createTicketRouter, showTicketRouter, listTicketRouter];
