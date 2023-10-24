import { TicketDoc } from "../models/ticket";

declare global {
  namespace Express {
    export interface Request {
      ticket?: TicketDoc;
    }
  }
}
