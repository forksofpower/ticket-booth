import { OrderDoc } from "../models/order";

declare module "express-serve-static-core" {
  interface Request {
    context: {
      currentUser?: {
        id: string;
        email: string;
      };
      order: OrderDoc;
    };
  }
}
