import { createTicketRouter } from "./new";
import { showTicketRouter } from "./show";

export const routes = [createTicketRouter, showTicketRouter];
