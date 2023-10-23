import { TicketDoc } from "../models/ticket";

declare global {
  namespace Express {
    interface Request {
      document?: TicketDoc;
    }
  }
}
