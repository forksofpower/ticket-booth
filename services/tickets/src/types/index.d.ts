import { TicketDoc } from "../models/ticket";

declare module "express-serve-static-core" {
  interface Request {
    context: {
      currentUser?: {
        id: string;
        email: string;
      };
      ticket: TicketDoc;
    };
  }
}
