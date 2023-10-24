import { OrderDoc } from "../models/order";

declare global {
  namespace Express {
    export interface Request {
      order?: OrderDoc;
    }
  }
}
